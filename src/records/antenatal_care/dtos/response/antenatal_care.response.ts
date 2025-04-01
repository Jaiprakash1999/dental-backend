import { ApiProperty } from '@nestjs/swagger';
import { FETAL_MOVEMENTS } from 'src/utils/enums/fetal_movements.enum';

export class ANCOptionalInvestigationResponse {
  id?: string;
  date?: Date;
  title?: string;
  value?: string;
  isDelete: boolean;
}
export class ANCAntenatalVisitResponse {
  id: string;
  day: string;
  date: string;
  complaints:string;
  pogWeeks: number;
  weightInKg: number;
  pulseRateInBpm: number;
  bloodPressure: string;
  pallor: string;
  oedema: string;
  jaundice: string;
  fundalHeight: string;
  liePresentation: string;
  fetalMovements: FETAL_MOVEMENTS;
  fetalHeartRatePerMin: number;
  pvIfDone: string;
  haemoglobin: string;
  hivScreening: string;
  vdrl: string;
  hbsAg: string;
  bloodSugar: string;
  urineAlbumin: string;
  urineSugar: string;
  ultraSonography: string;
}

export class AntenatalCareResponse {
  id: string;
  patientId: string;
  pastSurgicalHistory: string;
  pastMedicalHistory: string;
  treatmentHistory: string;
  apH: boolean;
  eclampsia: boolean;
  piH: boolean;
  anaemia: boolean;
  obstructedLabor: boolean;
  pPH: boolean;
  lSCS: boolean;
  congenitalAnomaly: boolean;
  otherComplications: boolean;
  tuberculosis: boolean;
  hypertension: boolean;
  heartDisease: boolean;
  diabetes: boolean;
  asthma: boolean;
  otherMedicalHistory: boolean;
  gplad?: string;
  previousDelivery: string;
  previousChildren: string[];
  heart: string;
  lungs: string;
  breasts: string;
  thyroid: string;
  spine: string;
  gait: string;
  urinePregnancyTest: string;
  urinePregnancyTestDate?: Date;
  bloodGroupRhTyping: string;
  bloodGroupRhTypingDate?: Date;
  antenatalVisits?: ANCAntenatalVisitResponse[];
  optionalInvestigations?: ANCOptionalInvestigationResponse[];
  notes: string;
}
