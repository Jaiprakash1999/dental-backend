import { ApiProperty } from '@nestjs/swagger';

class TemplateRxResponse {
  @ApiProperty({ description: 'Name of the drug' })
  drugName: string;

  @ApiProperty({ description: 'Dosage of the drug' })
  dose?: string;

  @ApiProperty({
    description: 'Measurement unit for the drug',
  })
  measurement?: string;

  @ApiProperty({ description: 'Timing for taking the drug' })
  timing?: string;

  @ApiProperty({
    description: 'Duration for the prescription',
  })
  duration?: string;

  @ApiProperty({ description: 'Frequency of taking the drug' })
  frequency?: string;

  @ApiProperty({
    description: 'Additional notes for the prescription',
  })
  notes?: string;
}

export class TemplateResponse {
  @ApiProperty({
    description: 'Unique identifier for the prescription response',
  })
  id: string;

  @ApiProperty({ description: 'List of chief complaints' })
  chiefComplaint: string[];

  @ApiProperty({ description: 'Follow-up instructions' })
  followUp: string;

  @ApiProperty({ description: 'Lifestyle recommendations' })
  lifeStyleRecommendations: string[];

  @ApiProperty({ description: 'Instructions for the patient' })
  instructions: string[];

  @ApiProperty({ description: 'List of diagnoses' })
  diagnosis: string[];

  @ApiProperty({ description: 'Name of the template' })
  templateName: string;

  @ApiProperty({
    type: [TemplateRxResponse],
    description: 'List of prescribed medications',
  })
  rxList: TemplateRxResponse[];

  @ApiProperty({ description: 'List of lab investigations' })
  labInvestigations: string[];

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: string;
}
