import { RecordAntenatalCare } from 'src/entities/dynamic/records_antenatal_care.entity';
import { AntenatalCareCreate } from '../dtos/request/antenatal_care_create.request';
import { ANCAntenatalVisitCreate } from '../dtos/request/anc_antenatal_visit_create.request';
import { RecordANCAntenatalVisit } from 'src/entities/dynamic/records_anc_antenatal_visit.entity';
import { ANCAntenatalVisitUpdate } from '../dtos/request/anc_antenatal_visit_update.request';
import { AntenatalCareUpdate } from '../dtos/request/antenatal_care_update.request';
import { ANCOptionalInvestigationCreate } from '../dtos/request/anc_optional_investigations_create.request';
import { RecordANCOptionalInvestigation } from 'src/entities/dynamic/records_anc_optional_investigations.entity';
import { ANCOptionalInvestigationUpdate } from '../dtos/request/anc_optional_investigations_update.request';

export function mapRequestToAntenatalCare(
  userId: number,
  body: AntenatalCareCreate,
): RecordAntenatalCare {
  const form = new RecordAntenatalCare();
  // Metadata
  form.patientId = body.patientId;
  form.pastSurgicalHistory = body.pastSurgicalHistory;
  form.pastMedicalHistory = body.pastMedicalHistory;
  form.treatmentHistory = body.treatmentHistory;
  form.apH = body.apH;
  form.eclampsia = body.eclampsia;
  form.piH = body.piH;
  form.anaemia = body.anaemia;
  form.obstructedLabor = body.obstructedLabor;
  form.pPH = body.pPH;
  form.lSCS = body.lSCS;
  form.congenitalAnomaly = body.congenitalAnomaly;
  form.otherComplications = body.otherComplications;
  form.tuberculosis = body.tuberculosis;
  form.hypertension = body.hypertension;
  form.heartDisease = body.heartDisease;
  form.diabetes = body.diabetes;
  form.asthma = body.asthma;
  form.otherMedicalHistory = body.otherMedicalHistory;
  form.gplad = body.gplad;
  form.previousDelivery = body.previousDelivery;
  form.previousChildren = body.previousChildren;
  form.heart = body.heart;
  form.lungs = body.lungs;
  form.breasts = body.breasts;
  form.thyroid = body.thyroid;
  form.spine = body.spine;
  form.gait = body.gait;
  form.urinePregnancyTest = body.urinePregnancyTest;
  form.urinePregnancyTestDate = body.urinePregnancyTestDate;
  form.bloodGroupRhTyping = body.bloodGroupRhTyping;
  form.bloodGroupRhTypingDate = body.bloodGroupRhTypingDate;
  form.notes = body.notes;
  form.createdBy = userId;
  return form;
}

export function mapRequestToANCAntenatalVisit(
  antenatalCareId: string,
  body: ANCAntenatalVisitCreate,
  order: number,
): RecordANCAntenatalVisit {
  const form = new RecordANCAntenatalVisit();
  form.order = order;
  form.day = body.day;
  form.date = body.date;
  form.complaints = body.complaints;
  form.pogWeeks = body.pogWeeks;
  form.weightInKg = body.weightInKg;
  form.pulseRateInBpm = body.pulseRateInBpm;
  form.bloodPressure = body.bloodPressure;
  form.pallor = body.pallor;
  form.oedema = body.oedema;
  form.jaundice = body.jaundice;
  form.fundalHeight = body.fundalHeight;
  form.liePresentation = body.liePresentation;
  form.fetalMovements = body.fetalMovements;
  form.fetalHeartRatePerMin = body.fetalHeartRatePerMin;
  form.pvIfDone = body.pvIfDone;
  form.haemoglobin = body.haemoglobin;
  form.urineAlbumin = body.urineAlbumin;
  form.urineSugar = body.urineSugar;
  form.hivScreening = body.hivScreening;
  form.vdrl = body.vdrl;
  form.hbsAg = body.hbsAg;
  form.bloodSugar = body.bloodSugar;
  form.ultraSonography = body.ultraSonography;
  form.antenatalCareId = antenatalCareId;
  return form;
}

export function mapRequestToAncOptionalInvestigation(
  antenatalCareId: string,
  body: ANCOptionalInvestigationCreate,
  order: number,
) {
  const form = new RecordANCOptionalInvestigation();
  form.antenatalCareId = antenatalCareId;
  form.order = order;
  form.date = body.date;
  form.value = body.value;
  form.title = body.title;
  return form;
}

export function mapUpdateToAntenatalCare(
  userId: number,
  form: RecordAntenatalCare,
  body: AntenatalCareUpdate,
): RecordAntenatalCare {
  // Metadata
  form.updatedBy = userId;
  form.pastSurgicalHistory = body.pastSurgicalHistory;
  form.pastMedicalHistory = body.pastMedicalHistory;
  form.treatmentHistory = body.treatmentHistory;
  form.apH = body.apH;
  form.eclampsia = body.eclampsia;
  form.piH = body.piH;
  form.anaemia = body.anaemia;
  form.obstructedLabor = body.obstructedLabor;
  form.pPH = body.pPH;
  form.lSCS = body.lSCS;
  form.congenitalAnomaly = body.congenitalAnomaly;
  form.otherComplications = body.otherComplications;
  form.tuberculosis = body.tuberculosis;
  form.hypertension = body.hypertension;
  form.heartDisease = body.heartDisease;
  form.diabetes = body.diabetes;
  form.asthma = body.asthma;
  form.otherMedicalHistory = body.otherMedicalHistory;
  form.gplad = body.gplad;
  form.previousDelivery = body.previousDelivery;
  form.previousChildren = body.previousChildren;
  form.heart = body.heart;
  form.lungs = body.lungs;
  form.breasts = body.breasts;
  form.thyroid = body.thyroid;
  form.spine = body.spine;
  form.gait = body.gait;
  form.urinePregnancyTest = body.urinePregnancyTest;
  form.urinePregnancyTestDate = body.urinePregnancyTestDate;
  form.bloodGroupRhTyping = body.bloodGroupRhTyping;
  form.bloodGroupRhTypingDate = body.bloodGroupRhTypingDate;
  form.notes = body.notes;

  return form;
}

export function mapUpdateToANCAntenatalVisit(
  form: RecordANCAntenatalVisit,
  body: ANCAntenatalVisitUpdate,
): RecordANCAntenatalVisit {
  form.day = body.day;
  form.date = body.date;
  form.complaints = body.complaints;
  form.pogWeeks = body.pogWeeks;
  form.weightInKg = body.weightInKg;
  form.pulseRateInBpm = body.pulseRateInBpm;
  form.bloodPressure = body.bloodPressure;
  form.pallor = body.pallor;
  form.oedema = body.oedema;
  form.jaundice = body.jaundice;
  form.fundalHeight = body.fundalHeight;
  form.liePresentation = body.liePresentation;
  form.fetalMovements = body.fetalMovements;
  form.fetalHeartRatePerMin = body.fetalHeartRatePerMin;
  form.pvIfDone = body.pvIfDone;
  form.haemoglobin = body.haemoglobin;
  form.urineAlbumin = body.urineAlbumin;
  form.urineSugar = body.urineSugar;
  form.hivScreening = body.hivScreening;
  form.vdrl = body.vdrl;
  form.hbsAg = body.hbsAg;
  form.bloodSugar = body.bloodSugar;
  form.ultraSonography = body.ultraSonography;
  return form;
}

export function mapToUpdateAncOptionalInvestigation(
  form: RecordANCOptionalInvestigation,
  body: ANCOptionalInvestigationUpdate,
) {
  form.date = body.date;
  form.value = body.value;
  form.title = body.title;
  form.isDelete = body.isDelete;
  return form;
}
