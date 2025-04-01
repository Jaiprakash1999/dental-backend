import { RecordScreeningForm } from 'src/entities/dynamic/records_screening_form.entity';
import { RecordSFLabInvestigations } from 'src/entities/dynamic/records_sf_lab_investigations.entity';
import { ScreeningFormResponse } from '../dtos/response/screening_form.response';
import { ScreeningFormMetaResponse } from '../dtos/response/screening_form_meta.response';

export function mapScreeningFormResponse(
  screeningForm: RecordScreeningForm,
  labInvestigations: RecordSFLabInvestigations[],
): ScreeningFormResponse {
  const response = new ScreeningFormResponse();
  response.id = screeningForm.id;
  response.diagnosis = screeningForm.diagnosis;
  response.notes = screeningForm.notes;
  response.labInvestigations = labInvestigations.map((li) => ({
    id: li.id,
    labInvestigation: li.labInvestigation,
    result: li.result,
    note: li.note,
  }));
  return response;
}

export function mapScreeningFormMetaResponse(
  users: object[],
  form: RecordScreeningForm,
): ScreeningFormMetaResponse {
  const response = new ScreeningFormMetaResponse();
  response.id = form.id;
  response.diagnosis = form.diagnosis;
  response.dateCreated = form.createdAt.toISOString();
  response.dateUpdated = form.updatedAt.toISOString();
  response.createdBy = users.find((user) => user['id'] == form.createdBy)[
    'name'
  ];
  response.updatedBy = form.lastUpdatedBy
    ? users.find((user) => user['id'] == form.lastUpdatedBy)['name']
    : null;
  return response;
}
