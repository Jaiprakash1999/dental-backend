import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadDocumentService } from './upload_document.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Upload Document')
@Controller('/api/v1/mmu/records/upload-record')
export class UploadDocumentController {
  constructor(private readonly uploadService: UploadDocumentService) {}
  @Post()
  @ApiOperation({ summary: 'upload and save a record' })
  @UseInterceptors(FileInterceptor('document'))
  upload(
    @Headers('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body('documentName') documentName: string,
    @Body('patientId') patientId: string,
  ) {
    return this.uploadService.uploadDocument(id, documentName, patientId, file);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.uploadService.getDocumentById(id);
  }
}
