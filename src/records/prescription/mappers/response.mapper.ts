import { RecordPrescription } from 'src/entities/dynamic/records_prescription.entity';
import { RecordPrescriptionRx } from 'src/entities/dynamic/records_prescription_rx.entity';
import { PrescriptionResponse } from '../dtos/response/prescription.response';
import { PrescriptionMetaResponse } from '../dtos/response/prescription_meta.response';

export function mapToPrescriptionResponse(
  users: object[],
  patientName: string,
  prescription: RecordPrescription,
  prescriptionRx: RecordPrescriptionRx[],
): PrescriptionResponse {
  const response = new PrescriptionResponse();
  response.id = prescription.id;
  response.chiefComplaint = prescription.chiefComplaint;
  response.followUp = prescription.followUp;
  response.lifeStyleRecommendations = prescription.lifeStyleRecommendations;
  response.instructions = prescription.instructions;
  response.diagnosis = prescription.diagnosis;
  response.rxList = prescriptionRx.map((rx) => ({
    drugName: rx.drugName,
    dose: rx.dose,
    measurement: rx.measurement,
    timing: rx.timing,
    duration: rx.duration,
    frequency: rx.frequency,
    notes: rx.notes,
  }));
  response.labInvestigations = prescription.labInvestigations;
  response.visitId = prescription.visitId;
  response.patient = patientName;
  response.createdBy = users.find(
    (user) => user['id'] == prescription.createdBy,
  )['name'];
  response.createdAt = prescription.createdAt.toISOString();
  response.signature = prescription.signature;
  response.stamp = prescription.stamp;
  return response;
}

export function mapToPrescriptionMetaResponse(
  users: object[],
  prescription: RecordPrescription,
): PrescriptionMetaResponse {
  const response = new PrescriptionMetaResponse();
  response.id = prescription.id;
  response.chiefComplaint = prescription.chiefComplaint;
  response.diagnosis = prescription.diagnosis;
  response.dateCreated = prescription.createdAt.toISOString();
  response.dateUpdated = prescription.updatedAt.toISOString();
  response.createdBy = users.find(
    (user) => user['id'] == prescription.createdBy,
  )['name'];
  response.updatedBy = prescription.updatedBy
    ? users.find((user) => user['id'] == prescription.updatedBy)['name']
    : null;
  return response;
}
