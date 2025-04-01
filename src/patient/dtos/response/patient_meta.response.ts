import { ApiProperty } from '@nestjs/swagger';
import { BloodGroup } from 'src/utils/enums/blood_group.enum';
import { Gender } from 'src/utils/enums/gender.enum';
import { PatientTag } from 'src/utils/enums/patient_tags.enum';

export class PatientMetaResponse {
  @ApiProperty({
    description: 'Unique identifier for the patient',
    example: 1,
  })
  id: string;

  @ApiProperty({
    description: 'Full name of the patient',
    example: 'John Doe',
  })
  name: string;

  dob: string;

  @ApiProperty({ description: 'Full name of the patient', example: 'John Doe' })
  fatherName: string;

  @ApiProperty({
    description: 'Age of the patient',
    example: 27,
  })
  age: number;

  @ApiProperty({
    description:
      'Base64-encoded string representing the thumbnail image of the patient',
    example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...',
  })
  thumbnail: string;

  @ApiProperty({ description: 'habitat of the patient' })
  habitat: string;

  @ApiProperty({ description: 'patient tag of the patient' })
  patientTag: PatientTag;

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
    description: 'Gender of the patient',
    example: Gender.MALE,
  })
  gender: Gender;

  @ApiProperty({
    description: 'State where the patient resides',
    example: 'New York',
  })
  state: string;

  @ApiProperty({
    description: 'State where the patient resides',
    example: 'New York',
  })
  address: string;

  @ApiProperty({
    description: 'District where the patient resides',
    example: 'Manhattan',
  })
  district: string;

  @ApiProperty({
    description: 'City where the patient resides',
    example: 'New York City',
  })
  city: string;

  @ApiProperty({
    description: 'Tehsil where the patient resides',
    example: 'Tehsil A',
  })
  tehsil: string;

  @ApiProperty({
    description: 'Blood Group of the patient',
    example: BloodGroup.AB_NEGATIVE,
  })
  bloodGroup: BloodGroup;
}
