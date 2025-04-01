import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VisitStatus } from 'src/utils/enums/visit_status.enum';

export class VisitStatusUpdate {
  @ApiProperty({
    description: 'The updated status of the visit',
    enum: VisitStatus,
    example: VisitStatus.COMPLETED,
  })
  @IsEnum(VisitStatus)
  visitStatus: VisitStatus;
}
