import { RecordVaccinationForm } from 'src/entities/dynamic/records_vaccination_form.entity';
import { VaccinationFormCreate } from '../dtos/request/vaccination_form_create.request';
import { VaccinationFormUpdate } from '../dtos/request/vaccination_form_update.request';

export function mapRequestToVaccinationForm(
  userId: number,
  body: VaccinationFormCreate,
): RecordVaccinationForm {
  const form = new RecordVaccinationForm();
  form.patientId = body.patientId;
  form.dateOfBirth = body.dateOfBirth;
  form.bcg = body.birth.bcg;
  form.opv0 = body.birth.opv0;
  form.hepatitisB = body.birth.hepatitisB;
  form.opv1 = body.sixWeeks.opv1;
  form.pentavalent1 = body.sixWeeks.pentavalent1;
  form.rvv1 = body.sixWeeks.rvv1;
  form.fipv1 = body.sixWeeks.fipv1;
  form.pcv1 = body.sixWeeks.pcv1;
  form.opv2 = body.tenWeeks.opv2;
  form.pentavalent2 = body.tenWeeks.pentavalent2;
  form.rvv2 = body.tenWeeks.rvv2;
  form.opv3 = body.fourteenWeeks.opv3;
  form.pentavalent3 = body.fourteenWeeks.pentavalent3;
  form.fipv2 = body.fourteenWeeks.fipv2;
  form.rvv3 = body.fourteenWeeks.rvv3;
  form.pcv2 = body.fourteenWeeks.pcv2;
  form.mr1 = body.nineToTwelveMonths.mr1;
  form.je1 = body.nineToTwelveMonths.je1;
  form.pcvBooster = body.nineToTwelveMonths.pcvBooster;
  form.mr2 = body.sixteenToTwentyFourMonths.mr2;
  form.je2 = body.sixteenToTwentyFourMonths.je2;
  form.diphtheria = body.sixteenToTwentyFourMonths.diphtheria;
  form.dptBooster1 = body.sixteenToTwentyFourMonths.dptBooster1;
  form.opvBooster = body.sixteenToTwentyFourMonths.opvBooster;
  form.dptBooster2 = body.fiveToSixYears.dptBooster2;
  form.createdBy = userId;
  form.notes = body.notes;
  return form;
}

export function mapRequestToUpdateVaccinationForm(
  userId: number,
  form: RecordVaccinationForm,
  body: VaccinationFormUpdate,
): RecordVaccinationForm {
  form.bcg = body.birth.bcg;
  form.dateOfBirth = body.dateOfBirth;
  form.opv0 = body.birth.opv0;
  form.hepatitisB = body.birth.hepatitisB;
  form.opv1 = body.sixWeeks.opv1;
  form.pentavalent1 = body.sixWeeks.pentavalent1;
  form.rvv1 = body.sixWeeks.rvv1;
  form.fipv1 = body.sixWeeks.fipv1;
  form.pcv1 = body.sixWeeks.pcv1;
  form.opv2 = body.tenWeeks.opv2;
  form.pentavalent2 = body.tenWeeks.pentavalent2;
  form.rvv2 = body.tenWeeks.rvv2;
  form.opv3 = body.fourteenWeeks.opv3;
  form.pentavalent3 = body.fourteenWeeks.pentavalent3;
  form.fipv2 = body.fourteenWeeks.fipv2;
  form.rvv3 = body.fourteenWeeks.rvv3;
  form.pcv2 = body.fourteenWeeks.pcv2;
  form.mr1 = body.nineToTwelveMonths.mr1;
  form.je1 = body.nineToTwelveMonths.je1;
  form.pcvBooster = body.nineToTwelveMonths.pcvBooster;
  form.mr2 = body.sixteenToTwentyFourMonths.mr2;
  form.je2 = body.sixteenToTwentyFourMonths.je2;
  form.diphtheria = body.sixteenToTwentyFourMonths.diphtheria;
  form.dptBooster1 = body.sixteenToTwentyFourMonths.dptBooster1;
  form.opvBooster = body.sixteenToTwentyFourMonths.opvBooster;
  form.dptBooster2 = body.fiveToSixYears.dptBooster2;
  form.notes = body.notes;
  form.lastUpdatedBy = userId;
  return form;
}
