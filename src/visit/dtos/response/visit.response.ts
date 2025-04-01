import { ApiProperty } from '@nestjs/swagger';
import { BloodGroup } from 'src/utils/enums/blood_group.enum';
import { Gender } from 'src/utils/enums/gender.enum';
import { MMUUnit } from 'src/utils/enums/mmu_unit.enum';
import { VisitStatus } from 'src/utils/enums/visit_status.enum';
import { VisitTags } from 'src/utils/enums/visit_tags.enum';
import { VisitType } from 'src/utils/enums/visit_type.enum';

export class VisitResponse {
  @ApiProperty({
    description: 'Unique identifier for the visit',
    example: 'b8d53c10-23b6-42e7-8f8d-d6cc1b47e4b0',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the patient',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'id of the patient',
  })
  patientId: string;

  @ApiProperty({
    description: 'Age of the patient',
    example: 30,
  })
  age: number;

  @ApiProperty({
    description: 'Gender of the patient',
    enum: Gender,
    example: Gender.MALE,
  })
  gender: Gender;

  @ApiProperty({
    description: 'Unique identifier for the doctor handling the visit',
    example: 'b8d53c10-23b6-42e7-8f8d-d6cc1b47e4b0',
  })
  doctorId: string;

  @ApiProperty({
    description: 'Chief complaint of the patient',
    example: ['Fever for 3 days', 'Headache'],
    type: [String],
  })
  chiefComplaint: string[];

  @ApiProperty({
    description: 'Type of visit',
    enum: VisitType,
    example: VisitType.INPERSON,
  })
  visitType: VisitType;

  @ApiProperty({
    description: 'Date of the visit',
    example: '2025-01-24T10:30:00.000Z',
  })
  visitDate: string;

  @ApiProperty({
    description: 'Tags associated with the visit',
    enum: VisitTags,
    isArray: true,
    example: [VisitTags.CARE, VisitTags.BABYDELIVERY],
  })
  tags: VisitTags[];

  @ApiProperty({
    description: 'Unique token number for the visit',
    example: 1234,
  })
  tokenNumber: number;

  @ApiProperty({
    description: 'MMU unit responsible for the visit',
    enum: MMUUnit,
    example: MMUUnit.PINAPAKA,
  })
  mmuUnit: MMUUnit;

  @ApiProperty({
    description: 'Status of the visit',
    enum: VisitStatus,
    example: VisitStatus.COMPLETED,
  })
  visitStatus: VisitStatus;

  @ApiProperty({
    description: 'Creation date of the visit',
    example: '2025-01-24T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Update date of the visit',
    example: '2025-01-24T10:30:00.000Z',
  })
  updateAt: Date;

  @ApiProperty({
    description: 'Latitude of the visit location',
    example: 40.712776,
  })
  latitude: number;

  @ApiProperty({
    description: 'Longitude of the visit location',
    example: -74.005974,
  })
  longitude: number;

  @ApiProperty({
    description: 'ID of the MMU head',
    example: 456,
  })
  mmuHead: number;

  @ApiProperty({
    description: 'Thumbnail image of the patient or visit',
    example: 'https://example.com/thumbnail.jpg',
  })
  thumbnail: string;

  @ApiProperty({
    description: 'State where the visit occurred',
    example: 'New York',
  })
  state: string;

  @ApiProperty({
    description: 'City where the visit occurred',
    example: 'New York City',
  })
  city: string;

  @ApiProperty({
    description: 'Pincode of the visit location',
    example: '10001',
  })
  pincode: string;

  @ApiProperty({
    description: 'Tehsil where the visit occurred',
    example: 'Manhattan',
  })
  tehsil: string;

  @ApiProperty({
    description: 'District where the visit occurred',
    example: 'Manhattan',
  })
  district: string;

  @ApiProperty({
    description: 'Blood Group of the patient',
    example: BloodGroup.AB_NEGATIVE,
  })
  bloodGroup: BloodGroup;

  @ApiProperty({
    description: 'Name of the creating user',
    example: 'name of the created by',
  })
  createdBy: string;

  @ApiProperty({
    description: 'Address of the visit created',
    example: 'sevgo ka mohalla',
  })
  address: string;

  @ApiProperty({
    description: 'Phone no of the patient',
    example: '1234567890',
  })
  phoneNumber: string;
}
