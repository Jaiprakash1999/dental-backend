import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { DataSource, Repository } from 'typeorm';
import { Readable, Writable } from 'stream';
import * as fastCsv from 'fast-csv';
import { DataBackup } from '../entities/static/data_backup.entity'; // Import the DataBackup entity
import { TableNames } from '../utils/enums/table_names.enum'; // Import the TableNames enum
import { InjectRepository } from '@nestjs/typeorm';
import { MMUUnit } from 'src/utils/enums/mmu_unit.enum';
import { Sync } from 'src/entities/dynamic/sync.entity';
import { BroadCast } from 'src/entities/dynamic/broadcast.entity';
import { Chat } from 'src/entities/dynamic/chat.entity';
import { Patient } from 'src/entities/dynamic/patient.entity';
import { RecordANCAntenatalVisit } from 'src/entities/dynamic/records_anc_antenatal_visit.entity';
import { RecordAntenatalCare } from 'src/entities/dynamic/records_antenatal_care.entity';
import { RecordPregnancyOverview } from 'src/entities/dynamic/records_bd_po.entity';
import { RecordCareOfBaby } from 'src/entities/dynamic/records_care_of_baby.entity';
import { RecordCOBBabyCare } from 'src/entities/dynamic/records_cob_baby_care.entity';
import { RecordPNCPostpartumCare } from 'src/entities/dynamic/records_pnc_post_partum_care.entity';
import { RecordPostNatalCare } from 'src/entities/dynamic/records_post_natal_care.entity';
import { RecordPrescriptionRx } from 'src/entities/dynamic/records_prescription_rx.entity';
import { RecordPrescription } from 'src/entities/dynamic/records_prescription.entity';
import { RecordScreeningForm } from 'src/entities/dynamic/records_screening_form.entity';
import { RecordSFLabInvestigations } from 'src/entities/dynamic/records_sf_lab_investigations.entity';
import { RecordVaccinationForm } from 'src/entities/dynamic/records_vaccination_form.entity';
import { RecordVitalForm } from 'src/entities/dynamic/records_vital_form.entity';
import { TemplateRx } from 'src/entities/dynamic/template_rx.entity';
import { Template } from 'src/entities/dynamic/template.entity';
import { User } from 'src/entities/dynamic/user.entity';
import { Visit } from 'src/entities/dynamic/visit.entity';
import { mapEntity } from 'src/utils/entity.mapper';
import { RecordANCOptionalInvestigation } from 'src/entities/dynamic/records_anc_optional_investigations.entity';
const csvParser = require('csv-parser');
@Injectable()
export class DataBackupService {
  private readonly s3: S3Client;
  private readonly bucketName = process.env.AWS_S3_BUCKET_NAME;
  private readonly tableEntityMap = new Map<string, any>([
    [TableNames.BroadCast, BroadCast],
    [TableNames.Chat, Chat],
    [TableNames.Patient, Patient],
    [TableNames.Antenatal_visit, RecordANCAntenatalVisit],
    [TableNames.Antenatal_Care, RecordAntenatalCare],
    [TableNames.Pregnancy_overview, RecordPregnancyOverview],
    [TableNames.Care_of_baby, RecordCareOfBaby],
    [TableNames.Baby_care, RecordCOBBabyCare],
    [TableNames.Postpartum_care, RecordPNCPostpartumCare],
    [TableNames.Postnatal_care, RecordPostNatalCare],
    [TableNames.Prescription_rx, RecordPrescriptionRx],
    [TableNames.Prescription, RecordPrescription],
    [TableNames.Screening_Form, RecordScreeningForm],
    [TableNames.Lab_investigations, RecordSFLabInvestigations],
    [TableNames.Vaccination_form, RecordVaccinationForm],
    [TableNames.Vital_form, RecordVitalForm],
    [TableNames.Template_rx, TemplateRx],
    [TableNames.Template, Template],
    [TableNames.User, User],
    [TableNames.Visit, Visit],
    [TableNames.Optional_Investigation, RecordANCOptionalInvestigation],
  ]);
  constructor(
    @Inject('DYNAMIC_DB_DATASOURCE')
    private readonly dataSource: DataSource,
    @InjectRepository(DataBackup, 'staticDB')
    private readonly dataBackupRepository: Repository<DataBackup>,
    @InjectRepository(Sync, 'staticDB')
    private readonly syncRepository: Repository<Sync>,
  ) {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async exportAndUploadSingleTable(
    mmuUnit: MMUUnit,
    tableName: string,
  ): Promise<Buffer> {
    if (!tableName) {
      throw new BadRequestException('Table name is required');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      // Verify if the table exists
      const tableExists = await queryRunner.query(
        `
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' AND table_name = $1
        )
      `,
        [tableName],
      );

      if (!tableExists[0].exists) {
        throw new BadRequestException(`Table "${tableName}" does not exist`);
      }

      // Fetch data
      const data = await queryRunner.query(`SELECT * FROM "${tableName}"`);
      const csvBuffer = await this.convertToCsvBuffer(data);

      // Define S3 path
      const dateFolder = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const s3Key = `${dateFolder}/${mmuUnit}/${tableName}.csv`;

      // Upload CSV to S3
      await this.uploadCsvToS3(csvBuffer, s3Key);
      return csvBuffer;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async convertToCsvBuffer(data: any[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const csvStream = fastCsv.format({ headers: true });
      const bufferArray: Buffer[] = [];

      // Capture data chunks into buffer array
      const writableStream = new Writable({
        write(chunk, encoding, callback) {
          bufferArray.push(Buffer.from(chunk));
          callback();
        },
      });

      writableStream.on('finish', () => resolve(Buffer.concat(bufferArray)));
      writableStream.on('error', reject);

      // Pipe CSV stream to the writable stream
      csvStream.pipe(writableStream);

      // Write data into CSV stream
      data.forEach((row) => csvStream.write(row));

      // End the CSV stream after writing all data
      csvStream.end();
    });
  }

  private async uploadCsvToS3(csvBuffer: Buffer, s3Key: string): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: s3Key,
      Body: csvBuffer,
      ContentType: 'text/csv',
    });

    await this.s3.send(command);
  }

  async backupAllTables(id: number, mmuUnit: MMUUnit): Promise<DataBackup> {
    const dataBackup = new DataBackup();

    try {
      await this.exportAndUploadSingleTable(mmuUnit, TableNames.BroadCast);
      dataBackup.broadCast = true;
    } catch (error) {
      console.error(`Failed to backup table BroadCast: ${error.message}`);
      dataBackup.broadCast = false;
    }

    try {
      await this.exportAndUploadSingleTable(mmuUnit, TableNames.Chat);
      dataBackup.chat = true;
    } catch (error) {
      console.error(`Failed to backup table Chat: ${error.message}`);
      dataBackup.chat = false;
    }

    try {
      await this.exportAndUploadSingleTable(mmuUnit, TableNames.Patient);
      dataBackup.patient = true;
    } catch (error) {
      console.error(`Failed to backup table Patient: ${error.message}`);
      dataBackup.patient = false;
    }

    try {
      await this.exportAndUploadSingleTable(
        mmuUnit,
        TableNames.Antenatal_visit,
      );
      dataBackup.antenatalVisit = true;
    } catch (error) {
      console.error(`Failed to backup table Antenatal Visit: ${error.message}`);
      dataBackup.antenatalVisit = false;
    }

    try {
      await this.exportAndUploadSingleTable(
        mmuUnit,
        TableNames.Optional_Investigation,
      );
      dataBackup.optionalInvestigation = true;
    } catch (error) {
      console.error(
        `Failed to backup table Optional Investigation: ${error.message}`,
      );
      dataBackup.optionalInvestigation = false;
    }

    try {
      await this.exportAndUploadSingleTable(mmuUnit, TableNames.Antenatal_Care);
      dataBackup.antenatalCare = true;
    } catch (error) {
      console.error(`Failed to backup table Antenatal Care: ${error.message}`);
      dataBackup.antenatalCare = false;
    }

    try {
      await this.exportAndUploadSingleTable(
        mmuUnit,
        TableNames.Pregnancy_overview,
      );
      dataBackup.pregnancyOverview = true;
    } catch (error) {
      console.error(
        `Failed to backup table Pregnancy Overview: ${error.message}`,
      );
      dataBackup.pregnancyOverview = false;
    }

    try {
      await this.exportAndUploadSingleTable(mmuUnit, TableNames.Care_of_baby);
      dataBackup.careOfBaby = true;
    } catch (error) {
      console.error(`Failed to backup table Care of Baby: ${error.message}`);
      dataBackup.careOfBaby = false;
    }

    try {
      await this.exportAndUploadSingleTable(mmuUnit, TableNames.Baby_care);
      dataBackup.babyCare = true;
    } catch (error) {
      console.error(`Failed to backup table Baby Care: ${error.message}`);
      dataBackup.babyCare = false;
    }

    try {
      await this.exportAndUploadSingleTable(
        mmuUnit,
        TableNames.Postpartum_care,
      );
      dataBackup.postpartumCare = true;
    } catch (error) {
      console.error(`Failed to backup table Postpartum Care: ${error.message}`);
      dataBackup.postpartumCare = false;
    }

    try {
      await this.exportAndUploadSingleTable(mmuUnit, TableNames.Postnatal_care);
      dataBackup.postnatalCare = true;
    } catch (error) {
      console.error(`Failed to backup table Postnatal Care: ${error.message}`);
      dataBackup.postnatalCare = false;
    }

    try {
      await this.exportAndUploadSingleTable(
        mmuUnit,
        TableNames.Prescription_rx,
      );
      dataBackup.prescriptionRx = true;
    } catch (error) {
      console.error(`Failed to backup table Prescription RX: ${error.message}`);
      dataBackup.prescriptionRx = false;
    }

    try {
      await this.exportAndUploadSingleTable(mmuUnit, TableNames.Prescription);
      dataBackup.prescription = true;
    } catch (error) {
      console.error(`Failed to backup table Prescription: ${error.message}`);
      dataBackup.prescription = false;
    }

    try {
      await this.exportAndUploadSingleTable(mmuUnit, TableNames.Screening_Form);
      dataBackup.screeningForm = true;
    } catch (error) {
      console.error(`Failed to backup table Screening Form: ${error.message}`);
      dataBackup.screeningForm = false;
    }

    try {
      await this.exportAndUploadSingleTable(
        mmuUnit,
        TableNames.Lab_investigations,
      );
      dataBackup.labInvestigations = true;
    } catch (error) {
      console.error(
        `Failed to backup table Lab Investigations: ${error.message}`,
      );
      dataBackup.labInvestigations = false;
    }

    try {
      await this.exportAndUploadSingleTable(
        mmuUnit,
        TableNames.Vaccination_form,
      );
      dataBackup.vaccinationForm = true;
    } catch (error) {
      console.error(
        `Failed to backup table Vaccination Form: ${error.message}`,
      );
      dataBackup.vaccinationForm = false;
    }

    try {
      await this.exportAndUploadSingleTable(mmuUnit, TableNames.Vital_form);
      dataBackup.vitalForm = true;
    } catch (error) {
      console.error(`Failed to backup table Vital Form: ${error.message}`);
      dataBackup.vitalForm = false;
    }

    try {
      await this.exportAndUploadSingleTable(mmuUnit, TableNames.Template_rx);
      dataBackup.templateRx = true;
    } catch (error) {
      console.error(`Failed to backup table Template RX: ${error.message}`);
      dataBackup.templateRx = false;
    }

    try {
      await this.exportAndUploadSingleTable(mmuUnit, TableNames.Template);
      dataBackup.template = true;
    } catch (error) {
      console.error(`Failed to backup table Template: ${error.message}`);
      dataBackup.template = false;
    }

    try {
      await this.exportAndUploadSingleTable(mmuUnit, TableNames.User);
      dataBackup.user = true;
    } catch (error) {
      console.error(`Failed to backup table User: ${error.message}`);
      dataBackup.user = false;
    }

    try {
      await this.exportAndUploadSingleTable(mmuUnit, TableNames.Visit);
      dataBackup.visit = true;
    } catch (error) {
      console.error(`Failed to backup table Visit: ${error.message}`);
      dataBackup.visit = false;
    }
    dataBackup.createdBy = id;
    dataBackup.date = new Date().toISOString().split('T')[0];
    await this.dataBackupRepository.save(dataBackup);

    return dataBackup;
  }

  async getBackupDetails() {
    return await this.dataBackupRepository.findOne({
      where: { date: new Date().toISOString().split('T')[0] },
    });
  }

  async checkIfDataUploadedForMMUUnits(): Promise<Record<string, string>> {
    const mmuUnits = ['Pinapaka', 'Cherla', 'Burgampadu', 'AID']; // List of MMU units
    const dateFolder = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const results: Record<string, string> = {};

    for (const mmuUnit of mmuUnits) {
      const s3KeyPrefix = `${dateFolder}/${mmuUnit}/`;
      try {
        const command = {
          Bucket: this.bucketName,
          Prefix: s3KeyPrefix,
        };
        const response = await this.s3.send(new ListObjectsV2Command(command));
        results[mmuUnit] =
          response.Contents && response.Contents.length > 0
            ? 'Uploaded'
            : 'Not Uploaded yet';
      } catch (error) {
        console.error(
          `Failed to check S3 for MMU unit ${mmuUnit}: ${error.message}`,
        );
        results[mmuUnit] = 'Not Uploaded Yet';
      }
    }

    return results;
  }
  async syncAllMMUTables(): Promise<any> {
    const mmuUnits = ['Pinapaka', 'Cherla', 'Burgampadu', 'AID']; //, 'Cherla', 'Burgampadu', 'AID'
    const tablesToSync = [
      'broadCast',
      'chat',
      'patient',
      'record_anc_antenatal_visit',
      'record_anc_optional_investigation',
      'record_antenatal_care',
      'record_pregnancy_overview',
      'record_care_of_baby',
      'record_cob_baby_care',
      'record_pnc_postpartum_care',
      'record_post_natal_care',
      'record_prescription_rx',
      'record_prescription',
      'record_screening_form',
      'record_sf_lab_investigations',
      'record_vaccination_form',
      'record_vital_form',
      'template_rx',
      'template',
      'visit',
    ];

    console.log('🔄 Starting MMU data sync...');
    let sync = await this.syncRepository.findOne({
      where: { id: new Date().toISOString().split('T')[0] },
    });
    if (!sync) {
      sync = new Sync();
      sync.id = new Date().toISOString().split('T')[0];
    }
    for (const mmu of mmuUnits) {
      for (const tableName of tablesToSync) {
        const tableSync = await this.syncTableFromS3(mmu, tableName);
        if (tableSync == true) {
          sync[`${mmu.toLowerCase()}_${tableName.toLowerCase()}`] = 'Synced';
        } else {
          sync[`${mmu.toLowerCase()}_${tableName.toLowerCase()}`] =
            tableSync == 'Error: The specified key does not exist.'
              ? 'Data Not Exist'
              : tableSync;
        }
      }
    }
    const savedSync = await this.syncRepository.save(sync);
    let html = `
      <html>
      <head>
      <style>
      table {
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 20px;
      }
      th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: center;
      }
      th {
      background-color: #f4f4f4;
      font-weight: bold;
      }
      .synced {
      background-color: #d4edda;
      color: #155724;
      }
      .not-synced {
      background-color: #f8d7da;
      color: #721c24;
      }
      .pending {
      background-color: #fff3cd;
      color: #856404;
      }
      </style>
      </head>
      <body>
      <h1>MMU Sync Status</h1>
      <p>Date Of Sync: ${sync.id}</p>
      <table>
      <thead>
      <tr>
      <th>Table Name</th>
      ${mmuUnits.map((mmu) => `<th>${mmu}</th>`).join('')}
      </tr>
      </thead>
      <tbody>
    `;

    for (const tableName of tablesToSync) {
      html += `<tr><td>${tableName
        .split('_')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' ')}</td>`;
      for (const mmu of mmuUnits) {
        const key = `${mmu.toLowerCase()}_${tableName.toLowerCase()}`;
        const status = savedSync[key];
        let statusClass = 'pending';
        let statusText = 'Pending';

        if (status === 'Synced') {
          statusClass = 'synced';
          statusText = 'Synced';
        } else if (status && status !== 'Synced') {
          statusClass = 'not-synced';
          statusText = `Error: ${status}`;
        }

        html += `<td class="${statusClass}">${statusText}</td>`;
      }
      html += `</tr>`;
    }

    html += `
      </tbody>
      </table>
      </body>
      </html>
    `;

    return html;
  }
  private async syncTableFromS3(
    mmuUnit: string,
    tableName: string,
  ): Promise<any> {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const filePath = `${today}/${mmuUnit}/${tableName}.csv`; // Adjusted file path
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: filePath,
      });
      const { Body } = await this.s3.send(command);
      if (!Body) throw new Error('No data found');

      const records: any[] = await this.parseCsv(Body as Readable);

      await this.dataSource.transaction(async (manager) => {
        const entity = this.tableEntityMap.get(tableName);
        for (const record of records) {
          const existing = await manager.findOne(entity, {
            where: { id: record.id },
          });
          const newRecord = await mapEntity(tableName, record);
          if (!existing) {
            await manager.save(entity, newRecord);
          } else {
            if (
              existing['updatedAt'] &&
              newRecord['updatedAt'] &&
              new Date(existing['updatedAt']) < new Date(newRecord['updatedAt'])
            ) {
              await manager.update(entity, newRecord.id, newRecord);
            }
          }
        }
      });

      return true;
    } catch (error) {
      return error.message;
    }
  }
  private async parseCsv(stream: Readable): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      stream
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }
}
