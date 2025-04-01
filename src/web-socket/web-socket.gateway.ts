import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { spawn, ChildProcessWithoutNullStreams, exec } from 'child_process';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  constructor(private readonly jwtService: JwtService) {}
  private userSockets: Map<number, string> = new Map();

  private adbProcess: ChildProcessWithoutNullStreams;

  onModuleInit() {
    //this.startAdbLogListener();
  }

  handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization as string; // Extract token from query
    if (!token) {
      client.disconnect();
      return { error: 'No token provide please provide authorization token' };
    }
    try {
      // Verify the token and extract the payload
      const payload = this.jwtService.verify(token);

      const userId = payload.id; // Extract user ID from the payload
      if (userId) {
        this.userSockets.set(userId, client.id);
      } else {
        console.log('Invalid token: User ID not found');
        client.disconnect();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const token = client.handshake.headers.authorization as string;
    try {
      const payload = this.jwtService.verify(token);

      const userId = payload.id;
      if (userId) {
        this.userSockets.delete(userId);
      }
    } catch (error) {
      console.log('Invalid or expired token', error);
    }
  }

  emitNotification(userId: number, notification: any) {
    const socketId = this.userSockets.get(userId);
    if (socketId) {
      console.log(
        `Emitting to User: ${userId}, Socket ID: ${socketId}`,
        notification,
      );
      this.server.to(socketId).emit('notification', notification);
    } else {
      console.log(`No active socket found for User: ${userId}`);
    }
  }

  private startAdbLogListener() {
    console.log('Starting ADB log listener...');

    this.adbProcess = spawn('adb', ['logcat']);

    this.adbProcess.stdout.on('data', (data: Buffer) => {
      const logs = data.toString();
      this.processAdbLogs(logs);
    });

    this.adbProcess.stderr.on('data', (data: Buffer) => {
    });

    this.adbProcess.on('close', (code) => {
      console.log(`ADB process exited with code ${code}`);
      if (code === 255) {
        console.log('Device disconnected. Waiting for reconnection...');
        this.waitForDeviceAndRestart();
      }
    });
  }

  private waitForDeviceAndRestart() {
    const checkDevice = () => {
      exec('adb devices', (error, stdout) => {
        if (!error && stdout.includes('device')) {
          console.log('Device reconnected! Restarting ADB log listener...');
          this.startAdbLogListener();
        } else {
          setTimeout(checkDevice, 3000); // Check again after 3 seconds
        }
      });
    };
    checkDevice();
  }

  private processAdbLogs(logs: string) {
    logs.split('\n').forEach((log) => {
      if (log.includes('GPS_LOG')) {
        // Extract timestamp, latitude, and longitude
        const match = log.match(
          /GPS_LOG:\s([\d-:T.]+),\sLat:\s([-.\d]+),\sLng:\s([-.\d]+)/,
        );

        if (match) {
          const timestamp = match[1];
          const latitude = parseFloat(match[2]);
          const longitude = parseFloat(match[3]);

          // Emit the location data via WebSocket
          this.server.emit('location', { timestamp, latitude, longitude });
        } else {
          console.log('Failed to extract coordinates and timestamp');
        }
      }
    });
  }

  onModuleDestroy() {
    if (this.adbProcess) {
      console.log('Stopping ADB log listener...');
      this.adbProcess.kill();
    }
  }
}
