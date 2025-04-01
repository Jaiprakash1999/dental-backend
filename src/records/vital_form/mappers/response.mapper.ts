import { RecordVitalForm } from 'src/entities/dynamic/records_vital_form.entity';
import { VitalFormResponse } from '../dtos/response/vital_form.response';
import { VitalFormMetaResponse } from '../dtos/response/vital_form_meta.response';

export function mapVitalFormResponse(
  vital: RecordVitalForm,
): VitalFormResponse {
  const response = new VitalFormResponse();
  response.id = vital.id;
  response.weightInKg = vital.weightInKg;
  response.heightInCm = vital.heightInCm;
  response.heart = vital.heart;
  response.lungs = vital.lungs;
  response.bloodPressure = vital.bloodPressure;
  response.spo2InPercent = vital.spo2InPercent;
  response.respiratoryRateInBpm = vital.respiratoryRateInBpm;
  response.pulseRateInBpm = vital.pulseRateInBpm;
  response.tempInCelsius = vital.tempInCelsius;
  response.hemoglobinInPercent = vital.hemoglobinInPercent;
  response.notes = vital.notes;
  return response;
}

export function mapToVitalFormMetaResponse(
  users: object[],
  form: RecordVitalForm,
): VitalFormMetaResponse {
  const response = new VitalFormMetaResponse();
  response.id = form.id;
  response.dateCreated = form.createdAt.toISOString();
  response.dateUpdated = form.lastUpdatedAt.toISOString();
  response.createdBy = users.find((user) => user['id'] == form.createdBy)[
    'name'
  ];
  response.updatedBy = form.updatedBy
    ? users.find((user) => user['id'] == form.updatedBy)['name']
    : null;
  return response;
}
