import { ApiProperty } from '@nestjs/swagger';
import { LabResult } from 'src/utils/enums/lab_investigation_result.enum';

class SFLabInvestigationsResponse {
  @ApiProperty({ description: 'id of the sf lab investigation' })
  id: string;

  @ApiProperty({ description: 'lab Investigation' })
  labInvestigation: string;

  @ApiProperty({ description: 'result of the investigation' })
  result: LabResult;

  @ApiProperty({ description: 'note for the labInvestigation' })
  note: string;
}
export class ScreeningFormResponse {
  @ApiProperty({ description: 'id of the screeing form' })
  id: string;

  @ApiProperty({ description: 'Suspected diagnosis' })
  diagnosis: string;

  @ApiProperty({ description: 'Lab investigation of the related diagnosis' })
  labInvestigations: SFLabInvestigationsResponse[];

  notes: string;
}
