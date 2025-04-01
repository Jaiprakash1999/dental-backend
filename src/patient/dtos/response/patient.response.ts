import { ApiProperty } from '@nestjs/swagger';
import { BloodGroup } from 'src/utils/enums/blood_group.enum';
import { Gender } from 'src/utils/enums/gender.enum';
import { PatientTag } from 'src/utils/enums/patient_tags.enum';

export class PatientResponse {
  @ApiProperty({
    description: 'Unique identifier for the patient',
    example: 1,
  })
  id: string;

  @ApiProperty({
    description: 'Full name of the patient',
    example: 'Jane Doe',
  })
  name: string;

  @ApiProperty({ description: 'Full name of the patient', example: 'John Doe' })
  fatherName: string;

  @ApiProperty({
    description: 'Gender of the patient',
    enum: Gender,
    example: Gender.FEMALE,
  })
  gender: Gender;

  @ApiProperty({ description: 'habitat of the patient' })
  habitat: string;

  @ApiProperty({ description: 'patient tag of the patient' })
  patientTag: PatientTag;

  @ApiProperty({
    description: 'Date of birth (day) of the patient',
    example: 15,
  })
  dateOfBirth: number;

  @ApiProperty({
    description: 'Month of birth of the patient',
    example: 8,
  })
  monthOfBirth: number;

  @ApiProperty({
    description: 'Year of birth of the patient',
    example: 1990,
  })
  yearOfBirth: number;

  @ApiProperty({
    description: 'Phone number of the patient',
    example: '+1234567890',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'Blood group of the patient',
    enum: BloodGroup,
    example: BloodGroup.A_POSITIVE,
  })
  bloodGroup: BloodGroup;

  @ApiProperty({
    description:
      'Base64-encoded string representing the thumbnail image of the patient',
    example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...',
  })
  thumbnail: string;

  @ApiProperty({
    description:
      'Base64-encoded string representing the full photo of the patient',
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...',
  })
  photo: string;

  @ApiProperty({
    description: 'Latitude coordinate of the patient’s location',
    example: 40.712776,
  })
  latitude: number;

  @ApiProperty({
    description: 'Longitude coordinate of the patient’s location',
    example: -74.005974,
  })
  longitude: number;

  @ApiProperty({
    description: 'Address line of the patient’s location',
    example: '123 Main Street',
  })
  address: string;

  @ApiProperty({
    description: 'District where the patient resides',
    example: 'Manhattan',
  })
  district: string;

  @ApiProperty({
    description: 'Postal code of the patient’s location',
    example: '10001',
  })
  pincode: string;

  @ApiProperty({
    description: 'City where the patient resides',
    example: 'New York City',
  })
  city: string;

  @ApiProperty({
    description: 'State where the patient resides',
    example: 'New York',
  })
  state: string;

  @ApiProperty({
    description: 'Tehsil where the patient resides',
    example: 'Tehsil A',
  })
  tehsil: string;

  @ApiProperty({
    description: 'Date of the patient registered',
    example: '2020-12-30T12:34:45:232Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Date of the patient registered',
    example: '2020-12-30T12:34:45:232Z',
  })
  updatedAt: string;

  @ApiProperty({
    description: 'Created by',
    example: 'mmu admin 1',
  })
  createdBy: string;
}
