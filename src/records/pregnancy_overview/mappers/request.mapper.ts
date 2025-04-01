import { RecordVaccinationForm } from 'src/entities/dynamic/records_vaccination_form.entity';
import { PregnancyOverviewCreate } from '../dtos/request/pregnancy_overview_create.request';
import { RecordPregnancyOverview } from 'src/entities/dynamic/records_bd_po.entity';
import { PregnancyOverviewUpdate } from '../dtos/request/pregnancy_overview_update.request';

export function mapRequestToPregnancyOverview(
  userId: number,
  body: PregnancyOverviewCreate,
): RecordPregnancyOverview {
  const form = new RecordPregnancyOverview();

  form.patientId = body.patientId;
  form.tubectomyDate = body.tubectomyDate;
  form.isTubectomyCompleted = body.isTubectomyCompleted;
  form.isPregnancyRiskHigh = body.isPregnancyRiskHigh;
  form.pregnancyOutcomeNote = body.pregnancyOutcomeNote;

  // Family Identification
  form.motherName = body.familyIdentification?.motherName;
  form.motherAge = body.familyIdentification?.motherAge;
  form.motherMobileNumber = body.familyIdentification?.motherMobileNumber;
  form.fatherName = body.familyIdentification?.fatherName;
  form.fatherAge = body.familyIdentification?.fatherAge;
  form.fatherMobileNumber = body.familyIdentification?.fatherMobileNumber;
  form.address = body.familyIdentification?.address;
  form.motherId = body.familyIdentification?.motherId;
  form.bankName = body.familyIdentification?.bankName;
  form.accountNumber = body.familyIdentification?.accountNumber;
  form.ifscCode = body.familyIdentification?.ifscCode;

  // Pregnancy Period
  form.dolmp = body.pregnancyPeriod?.dolmp;
  form.edd = body.pregnancyPeriod?.edd;
  form.lastDeliveryAt = body.pregnancyPeriod?.lastDeliveryAt;
  form.currentDeliveryAt = body.pregnancyPeriod?.currentDeliveryAt;

  // Birth Record
  form.childName = body.birthRecord?.childName;
  form.dateOfBirth = body.birthRecord?.dateOfBirth;
  form.gender = body.birthRecord?.gender;
  form.birthRegistrationNumber = body.birthRecord?.birthRegistrationNumber;
  form.childIdNumber = body.birthRecord?.childIdNumber;
  form.birthWeightInKg = body.birthRecord?.birthWeightInKg;

  // Institute Identification
  form.anmName = body.instituteIdentification?.anmName;
  form.anmContact = body.instituteIdentification?.anmContact;
  form.chwName = body.instituteIdentification?.chwName;
  form.chwContact = body.instituteIdentification?.chwContact;
  form.phcName = body.instituteIdentification?.phcName;
  form.phcHospitalName = body.instituteIdentification?.phcHospitalName;
  form.referralTo = body.instituteIdentification?.referralTo;

  form.notes = body.notes;

  // Metadata
  form.createdBy = userId;

  return form;
}

export function mapToUpdatePregnancyOverview(
  userId: number,
  form: RecordPregnancyOverview,
  body: PregnancyOverviewUpdate,
): RecordPregnancyOverview {
  form.tubectomyDate = body.tubectomyDate;
  form.isTubectomyCompleted = body.isTubectomyCompleted;
  form.isPregnancyRiskHigh = body.isPregnancyRiskHigh;
  form.pregnancyOutcomeNote = body.pregnancyOutcomeNote;

  // Family Identification
  form.motherName = body.familyIdentification?.motherName;
  form.motherAge = body.familyIdentification?.motherAge;
  form.motherMobileNumber = body.familyIdentification?.motherMobileNumber;
  form.fatherName = body.familyIdentification?.fatherName;
  form.fatherAge = body.familyIdentification?.fatherAge;
  form.fatherMobileNumber = body.familyIdentification?.fatherMobileNumber;
  form.address = body.familyIdentification?.address;
  form.motherId = body.familyIdentification?.motherId;
  form.bankName = body.familyIdentification?.bankName;
  form.accountNumber = body.familyIdentification?.accountNumber;
  form.ifscCode = body.familyIdentification?.ifscCode;

  // Pregnancy Period
  form.dolmp = body.pregnancyPeriod?.dolmp;
  form.edd = body.pregnancyPeriod?.edd;
  form.lastDeliveryAt = body.pregnancyPeriod?.lastDeliveryAt;
  form.currentDeliveryAt = body.pregnancyPeriod?.currentDeliveryAt;

  // Birth Record
  form.childName = body.birthRecord?.childName;
  form.dateOfBirth = body.birthRecord?.dateOfBirth;
  form.gender = body.birthRecord?.gender;
  form.birthRegistrationNumber = body.birthRecord?.birthRegistrationNumber;
  form.childIdNumber = body.birthRecord?.childIdNumber;
  form.birthWeightInKg = body.birthRecord?.birthWeightInKg;

  // Institute Identification
  form.anmName = body.instituteIdentification?.anmName;
  form.anmContact = body.instituteIdentification?.anmContact;
  form.chwName = body.instituteIdentification?.chwName;
  form.chwContact = body.instituteIdentification?.chwContact;
  form.phcName = body.instituteIdentification?.phcName;
  form.phcHospitalName = body.instituteIdentification?.phcHospitalName;
  form.referralTo = body.instituteIdentification?.referralTo;

  form.notes = body.notes;
  // Metadata
  form.updatedBy = userId;
  return form;
}
