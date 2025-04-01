import { RecordPrescription } from 'src/entities/dynamic/records_prescription.entity';
import { PrescriptionRxCreate } from '../dtos/request/prescription_rx_create.request';
import { RecordPrescriptionRx } from 'src/entities/dynamic/records_prescription_rx.entity';
import { PrescriptionCreate } from '../dtos/request/prescription_create.request';

export function mapToPrescriptionRxEntity(
  prescriptionId: string,
  body: PrescriptionRxCreate,
): RecordPrescriptionRx {
  const rx = new RecordPrescriptionRx();
  rx.drugName = body.drugName;
  rx.dose = body.dose;
  rx.measurement = body.measurement;
  rx.timing = body.timing;
  rx.duration = body.duration;
  rx.frequency = body.frequency;
  rx.notes = body.notes;
  rx.prescriptionId = prescriptionId;
  return rx;
}
export function mapToPrescriptionEntity(
  userId: number,
  patientId: string,
  body: PrescriptionCreate,
): RecordPrescription {
  const prescription = new RecordPrescription();
  prescription.chiefComplaint = body.chiefComplaint;
  prescription.followUp = body.followUp;
  prescription.lifeStyleRecommendations = body.lifeStyleRecommendations;
  prescription.instructions = body.instructions;
  prescription.diagnosis = body.diagnosis;
  prescription.labInvestigations = body.labInvestigations;
  prescription.visitId = body.visitId;
  prescription.patientId = patientId;
  prescription.createdBy = userId;
  prescription.signature = body.signature;
  prescription.stamp = body.stamp;
  return prescription;
}
