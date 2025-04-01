import { ApiProperty } from '@nestjs/swagger';

export class PrescriptionMetaResponse {
  @ApiProperty({ description: 'id of the screening form' })
  id: string;

  @ApiProperty({ description: 'chiefComplaints of the screening form' })
  chiefComplaint: string[];

  @ApiProperty({ description: 'diagnosis of the screening form' })
  diagnosis: string[];

  @ApiProperty({ description: 'created by' })
  createdBy: string;

  @ApiProperty({ description: 'updated by' })
  updatedBy: string;

  @ApiProperty({ description: 'updated at' })
  dateUpdated: string;

  @ApiProperty({ description: 'created at' })
  dateCreated: string;
}
