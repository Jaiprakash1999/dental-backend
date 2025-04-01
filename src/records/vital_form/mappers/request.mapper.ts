import { RecordVitalForm } from 'src/entities/dynamic/records_vital_form.entity';
import { VitalFormCreate } from '../dtos/request/vital_form_create.request';
import { VitalFormUpdate } from '../dtos/request/vital_form_update.request';

export function mapVitalFormEntity(
  userId: number,
  body: VitalFormCreate,
  patientId: string,
): RecordVitalForm {
  const vital = new RecordVitalForm();
  vital.weightInKg = body.weightInKg;
  vital.heightInCm = body.heightInCm;
  vital.heart = body.heart;
  vital.lungs = body.lungs;
  vital.bloodPressure = body.bloodPressure;
  vital.spo2InPercent = body.spo2InPercent;
  vital.respiratoryRateInBpm = body.respiratoryRateInBpm;
  vital.pulseRateInBpm = body.pulseRateInBpm;
  vital.visitId = body.visitId;
  vital.tempInCelsius = body.tempInCelsius;
  vital.patientId = patientId;
  vital.createdBy = userId;
  vital.notes = body.notes;
  vital.hemoglobinInPercent = body.hemoglobinInPercent;
  return vital;
}

export function mapUpdateVitalForm(
  userId: number,
  vital: RecordVitalForm,
  body: VitalFormUpdate,
): RecordVitalForm {
  vital.weightInKg = body.weightInKg;
  vital.heightInCm = body.heightInCm;
  vital.heart = body.heart;
  vital.lungs = body.lungs;
  vital.bloodPressure = body.bloodPressure;
  vital.spo2InPercent = body.spo2InPercent;
  vital.respiratoryRateInBpm = body.respiratoryRateInBpm;
  vital.pulseRateInBpm = body.pulseRateInBpm;
  vital.tempInCelsius = body.tempInCelsius;
  vital.notes = body.notes;
  vital.hemoglobinInPercent = body.hemoglobinInPercent;
  vital.updatedBy = userId;
  return vital;
}
