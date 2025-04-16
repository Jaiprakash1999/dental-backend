import { UploadRecord } from 'src/entities/dynamic/upload_record.entity';

export function mapUploadDocumentMetaResponse(
  users: object[],
  form: UploadRecord,
): any {
  return {
    id: form.id,
    documentName: form.documentName,
    documnetType: form.documentType,
    document: form.document,
    dateCreated: form.createdAt?.toISOString(),
    dateUpdated: form.updatedAt?.toISOString(),
    createdBy:
      users.find((user) => user['id'] == form.createdBy)?.['name'] || null,
    updatedBy: form.lastUpdatedBy
      ? users.find((user) => user['id'] == form.lastUpdatedBy)?.['name'] || null
      : null,
  };
}
