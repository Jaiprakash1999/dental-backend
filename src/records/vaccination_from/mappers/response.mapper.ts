import { RecordVaccinationForm } from 'src/entities/dynamic/records_vaccination_form.entity';
import { VaccinationFormResponse } from '../dtos/response/vaccination_form.response';
import { VaccinationFormMetaResponse } from '../dtos/response/vaccination_form_meta.response';

export function mapToVaccinationResponse(
  form: RecordVaccinationForm,
): VaccinationFormResponse {
  const response = new VaccinationFormResponse();
  response.id = form.id;
  response.dateOfBirth = form.dateOfBirth ? form.dateOfBirth.toString() : null;
  response.birth = {
    bcg: form.bcg,
    opv0: form.opv0,
    hepatitisB: form.hepatitisB,
  };
  response.sixWeeks = {
    opv1: form.opv1,
    pentavalent1: form.pentavalent1,
    rvv1: form.rvv1,
    fipv1: form.fipv1,
    pcv1: form.pcv1,
  };
  response.tenWeeks = {
    opv2: form.opv2,
    pentavalent2: form.pentavalent2,
    rvv2: form.rvv2,
  };
  response.fourteenWeeks = {
    opv3: form.opv3,
    pentavalent3: form.pentavalent3,
    fipv2: form.fipv2,
    rvv3: form.rvv3,
    pcv2: form.pcv2,
  };
  response.nineToTwelveMonths = {
    mr1: form.mr1,
    je1: form.je1,
    pcvBooster: form.pcvBooster,
  };
  response.sixteenToTwentyFourMonths = {
    mr2: form.mr2,
    je2: form.je2,
    diphtheria: form.diphtheria,
    dptBooster1: form.dptBooster1,
    opvBooster: form.opvBooster,
  };
  response.fiveToSixYears = {
    dptBooster2: form.dptBooster2,
  };
  response.notes = form.notes;
  return response;
}

export function mapToVaccinationResponseMeta(
  users: object[],
  form: RecordVaccinationForm,
): VaccinationFormMetaResponse {
  const response = new VaccinationFormMetaResponse();
  response.id = form.id;
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
