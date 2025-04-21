import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { DoctorTimeSlotService } from './doctor_time_slot.service';

@Controller('/api/v1/mmu/doctor/slots')
export class DoctorTimeSlotController {
  constructor(private readonly slotService: DoctorTimeSlotService) {}

  @Post(':doctorId/:date')
  async saveSlots(
    @Param('doctorId') doctorId: string,
    @Param('date') dateStr: string,
    @Body() body: { slots: { time: string; isAvailable: boolean }[] },
  ) {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    return this.slotService.createSlots(doctorId, date, body.slots);
  }

  @Get(':doctorId/:date')
  async getSlots(
    @Param('doctorId') doctorId: string,
    @Param('date') dateStr: string,
  ) {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    return this.slotService.getSlots(doctorId, date);
  }
}
