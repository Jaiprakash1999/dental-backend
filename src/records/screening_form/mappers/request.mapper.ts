import { RecordScreeningForm } from 'src/entities/dynamic/records_screening_form.entity';
import { ScreeningFormCreate } from '../dtos/request/screening_from_create.request';
import { RecordSFLabInvestigations } from 'src/entities/dynamic/records_sf_lab_investigations.entity';
import { SFLabInvestigationCreate } from '../dtos/request/sf_lab_investigation_create.request';
import { SfLabInvestigationUpdate } from '../dtos/request/sf_lab_investigation_update.request';

export function mapScreeningFormEntity(
  creatorId: number,
  body: ScreeningFormCreate,
): RecordScreeningForm {
  const form = new RecordScreeningForm();
  form.diagnosis = body.diagnosis;
  form.patientId = body.patientId;
  form.notes = body.notes;
  form.createdBy = creatorId;
  return form;
}

export function mapSFLabInvestigationsEntity(
  screeningFormId: string,
  body: SFLabInvestigationCreate,
): RecordSFLabInvestigations {
  const response = new RecordSFLabInvestigations();
  response.labInvestigation = body.labInvestigation;
  response.result = body.result;
  response.note = body.note;
  response.screeningFormId = screeningFormId;
  return response;
}

export function mapUpdateSfLabInvestigationEntity(
  sfLabInvestigation: RecordSFLabInvestigations,
  body: SfLabInvestigationUpdate,
): RecordSFLabInvestigations {
  sfLabInvestigation.labInvestigation = body.labInvestigation
    ? body.labInvestigation
    : sfLabInvestigation.labInvestigation;
  sfLabInvestigation.result = body.result
    ? body.result
    : sfLabInvestigation.result;
  sfLabInvestigation.note = body.note ? body.note : sfLabInvestigation.note;
  return sfLabInvestigation;
}
