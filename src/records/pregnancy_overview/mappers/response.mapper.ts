import { RecordPregnancyOverview } from 'src/entities/dynamic/records_bd_po.entity';
import { RecordVaccinationForm } from 'src/entities/dynamic/records_vaccination_form.entity';
import { PregnancyOverviewResponse } from '../dtos/response/pregnancy_overview.response';
import { PregnancyOverviewMetaResponse } from '../dtos/response/pregnancy_overview_meta.response';

export function mapToPregnancyOverviewResponse(
  form: RecordPregnancyOverview,
): PregnancyOverviewResponse {
  const response = new PregnancyOverviewResponse();

  response.id = form.id;
  response.tubectomyDate = form.tubectomyDate;
  response.isTubectomyCompleted = form.isTubectomyCompleted;
  response.isPregnancyRiskHigh = form.isPregnancyRiskHigh;
  response.pregnancyOutcomeNote = form.pregnancyOutcomeNote;
  response.notes = form.notes;

  response.familyIdentification = {
    motherName: form.motherName,
    motherAge: form.motherAge,
    motherMobileNumber: form.motherMobileNumber,
    fatherName: form.fatherName,
    fatherAge: form.fatherAge,
    fatherMobileNumber: form.fatherMobileNumber,
    address: form.address,
    motherId: form.motherId,
    bankName: form.bankName,
    accountNumber: form.accountNumber,
    ifscCode: form.ifscCode,
  };

  response.pregnancyPeriod = {
    dolmp: form.dolmp,
    edd: form.edd,
    lastDeliveryAt: form.lastDeliveryAt,
    currentDeliveryAt: form.currentDeliveryAt,
  };

  response.birthRecord = {
    childName: form.childName,
    dateOfBirth: form.dateOfBirth,
    gender: form.gender,
    birthRegistrationNumber: form.birthRegistrationNumber,
    childIdNumber: form.childIdNumber,
    birthWeightInKg: form.birthWeightInKg,
  };

  response.instituteIdentification = {
    anmName: form.anmName,
    anmContact: form.anmContact,
    chwName: form.chwName,
    chwContact: form.chwContact,
    phcName: form.phcName,
    phcHospitalName: form.phcHospitalName,
    referralTo: form.referralTo,
  };

  return response;
}

export function mapToPregnancyOverviewMetaResponse(
  users: object[],
  form: RecordPregnancyOverview,
): PregnancyOverviewMetaResponse {
  const response = new PregnancyOverviewMetaResponse();
  response.id = form.id;
  response.dateCreated = form.createdAt.toISOString();
  response.dateUpdated = form.updatedAt.toISOString();
  response.createdBy = users.find((user) => user['id'] == form.createdBy)[
    'name'
  ];
  response.updatedBy = form.updatedBy
    ? users.find((user) => user['id'] == form.updatedBy)['name']
    : null;
  return response;
}
