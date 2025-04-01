import { Gender } from 'src/utils/enums/gender.enum';

class FamilyIdentification {
  motherName?: string;
  motherAge?: number;
  motherMobileNumber?: string;
  fatherName?: string;
  fatherAge?: number;
  fatherMobileNumber?: string;
  address?: string;
  motherId?: string;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
}

class PregnancyPeriod {
  dolmp?: Date;
  edd?: Date;
  lastDeliveryAt?: string;
  currentDeliveryAt?: string;
}

class BirthRecord {
  childName?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  birthRegistrationNumber?: string;
  childIdNumber?: string;
  birthWeightInKg?: number;
}

class InstituteIdentification {
  anmName?: string;
  anmContact?: string;
  chwName?: string;
  chwContact?: string;
  phcName?: string;
  phcHospitalName?: string;
  referralTo?: string;
}

export class PregnancyOverviewResponse {
  id: string;
  tubectomyDate?: Date;
  isTubectomyCompleted?: boolean;
  isPregnancyRiskHigh?: string[];
  pregnancyOutcomeNote?: string;
  familyIdentification: FamilyIdentification;
  pregnancyPeriod: PregnancyPeriod;
  birthRecord: BirthRecord;
  instituteIdentification: InstituteIdentification;
  notes: string;
}
