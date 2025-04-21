import { DentalRecord } from 'src/entities/dynamic/dental_record.entity';

export function mapDentalFormMetaResponse(
  users: object[],
  form: DentalRecord,
): any {
  return {
    id: form.id,
    diagnosis: form.diagnosis,
    typeOfTeeth: form.typeOfTeeth,
    dateCreated: form.createdAt?.toISOString(),
    dateUpdated: form.updatedAt?.toISOString(),
    createdBy:
      users.find((user) => user['id'] == form.createdBy)?.['name'] || null,
    updatedBy: form.lastUpdatedBy
      ? users.find((user) => user['id'] == form.lastUpdatedBy)?.['name'] || null
      : null,
  };
}
