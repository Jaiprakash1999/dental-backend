import { RecordANCAntenatalVisit } from 'src/entities/dynamic/records_anc_antenatal_visit.entity';
import {
  ANCAntenatalVisitResponse,
  ANCOptionalInvestigationResponse,
  AntenatalCareResponse,
} from '../dtos/response/antenatal_care.response';
import { AntenatalCareMetaResponse } from '../dtos/response/antenatal_care_meta.response';
import { RecordANCOptionalInvestigation } from 'src/entities/dynamic/records_anc_optional_investigations.entity';
import { RecordAntenatalCare } from 'src/entities/dynamic/records_antenatal_care.entity';

export function mapToAntenatalCareResponse(
  form: RecordAntenatalCare,
  antenatalVisits: RecordANCAntenatalVisit[],
  optionalInvestigations: RecordANCOptionalInvestigation[],
): AntenatalCareResponse {
  const response = new AntenatalCareResponse();
  response.id = form.id;
  response.patientId = form.patientId;
  response.pastSurgicalHistory = form.pastSurgicalHistory;
  response.pastMedicalHistory = form.pastMedicalHistory;
  response.treatmentHistory = form.treatmentHistory;
  response.apH = form.apH;
  response.eclampsia = form.eclampsia;
  response.piH = form.piH;
  response.anaemia = form.anaemia;
  response.obstructedLabor = form.obstructedLabor;
  response.pPH = form.pPH;
  response.lSCS = form.lSCS;
  response.congenitalAnomaly = form.congenitalAnomaly;
  response.otherComplications = form.otherComplications;
  response.tuberculosis = form.tuberculosis;
  response.hypertension = form.hypertension;
  response.heartDisease = form.heartDisease;
  response.diabetes = form.diabetes;
  response.asthma = form.asthma;
  response.otherMedicalHistory = form.otherMedicalHistory;
  response.gplad = form.gplad;
  response.previousDelivery = form.previousDelivery;
  response.previousChildren = form.previousChildren;
  response.heart = form.heart;
  response.lungs = form.lungs;
  response.breasts = form.breasts;
  response.thyroid = form.thyroid;
  response.spine = form.spine;
  response.gait = form.gait;
  response.bloodGroupRhTyping = form.bloodGroupRhTyping;
  response.bloodGroupRhTypingDate = form.bloodGroupRhTypingDate;
  response.urinePregnancyTest = form.urinePregnancyTest;
  response.urinePregnancyTestDate = form.urinePregnancyTestDate;
  response.notes = form.notes;

  response.antenatalVisits = antenatalVisits.map((visit) => {
    const antenatalVisit = new ANCAntenatalVisitResponse();
    antenatalVisit.id = visit.id;
    antenatalVisit.day = visit.day;
    antenatalVisit.date = visit.date != null ? visit.date.toString() : null;
    antenatalVisit.complaints = visit.complaints;
    antenatalVisit.pogWeeks = visit.pogWeeks;
    antenatalVisit.weightInKg = visit.weightInKg;
    antenatalVisit.pulseRateInBpm = visit.pulseRateInBpm;
    antenatalVisit.bloodPressure = visit.bloodPressure;
    antenatalVisit.pallor = visit.pallor;
    antenatalVisit.oedema = visit.oedema;
    antenatalVisit.jaundice = visit.jaundice;
    antenatalVisit.fundalHeight = visit.fundalHeight;
    antenatalVisit.liePresentation = visit.liePresentation;
    antenatalVisit.fetalMovements = visit.fetalMovements;
    antenatalVisit.fetalHeartRatePerMin = visit.fetalHeartRatePerMin;
    antenatalVisit.pvIfDone = visit.pvIfDone;
    antenatalVisit.haemoglobin = visit.haemoglobin;
    antenatalVisit.hivScreening = visit.hivScreening;
    antenatalVisit.vdrl = visit.vdrl;
    antenatalVisit.hbsAg = visit.hbsAg;
    antenatalVisit.bloodSugar = visit.bloodSugar;
    antenatalVisit.urineAlbumin = visit.urineAlbumin;
    antenatalVisit.urineSugar = visit.urineSugar;
    antenatalVisit.ultraSonography = visit.ultraSonography;
    return antenatalVisit;
  });

  response.optionalInvestigations = optionalInvestigations.map((oi) => {
    const optionalInvestigation = new ANCOptionalInvestigationResponse();
    optionalInvestigation.id = oi.id;
    optionalInvestigation.date = oi.date;
    optionalInvestigation.isDelete = oi.isDelete;
    optionalInvestigation.value = oi.value;
    optionalInvestigation.title = oi.title;
    return optionalInvestigation;
  });

  return response;
}

export function mapToAntenatalMetaResponse(
  users: object[],
  form: RecordAntenatalCare,
): AntenatalCareMetaResponse {
  const response = new AntenatalCareMetaResponse();
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
