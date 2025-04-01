import { ApiProperty } from '@nestjs/swagger';

export class VaccinationFormMetaResponse {
  @ApiProperty({ description: 'id of the vaccination form' })
  id: string;

  @ApiProperty({ description: 'date created' })
  dateCreated: string;

  @ApiProperty({ description: 'date updated' })
  dateUpdated: string;

  @ApiProperty({ description: 'created by' })
  createdBy: string;

  @ApiProperty({ description: 'updated by' })
  updatedBy: string;

}
