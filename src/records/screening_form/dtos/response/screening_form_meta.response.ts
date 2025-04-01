import { APP_FILTER } from '@nestjs/core';
import { ApiProperty } from '@nestjs/swagger';

export class ScreeningFormMetaResponse {
  @ApiProperty({ description: 'id of the screening form' })
  id: string;

  @ApiProperty({ description: 'diagnosis of the screening form' })
  diagnosis: string;

  @ApiProperty({ description: 'created by' })
  createdBy: string;

  @ApiProperty({ description: 'updated by' })
  updatedBy: string;

  @ApiProperty({ description: 'updated at' })
  dateUpdated: string;

  @ApiProperty({ description: 'created at' })
  dateCreated: string;
}
