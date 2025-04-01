import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PrescriptionRxCreate {
  @ApiProperty({
    description: 'The name of the drug prescribed to the patient',
    example: 'Paracetamol',
  })
  @IsNotEmpty()
  @IsString()
  drugName: string;

  @ApiProperty({
    description: 'The dose of the prescribed drug (e.g., 500mg)',
    example: '500mg',
    required: false,
  })
  @IsOptional()
  @IsString()
  dose?: string;

  @ApiProperty({
    description: 'The unit of measurement for the drug (e.g., mg, ml)',
    example: 'mg',
    required: false,
  })
  @IsOptional()
  @IsString()
  measurement?: string;

  @ApiProperty({
    description:
      'The timing for taking the drug (e.g., once a day, after meals)',
    example: 'Once a day, after meals',
    required: false,
  })
  @IsOptional()
  @IsString()
  timing?: string;

  @ApiProperty({
    description:
      'The duration for which the drug should be taken (e.g., 7 days)',
    example: '7 days',
    required: false,
  })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiProperty({
    description: 'The frequency of the drug intake (e.g., twice a day)',
    example: 'Twice a day',
    required: false,
  })
  @IsOptional()
  @IsString()
  frequency?: string;

  @ApiProperty({
    description: 'Additional notes or instructions related to the drug',
    example: 'Take with food',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
