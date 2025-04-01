import { RecordPNCPostpartumCare } from 'src/entities/dynamic/records_pnc_post_partum_care.entity';
import { RecordPostNatalCare } from 'src/entities/dynamic/records_post_natal_care.entity';
import { PostNatalCareResponse } from '../dtos/response/post_natal_care.response';
import { PostNatalCareMetaResponse } from '../dtos/response/post_natal_care_meta.response';

export function mapToPostNatalCareResponse(
  form: RecordPostNatalCare,
  postpartumCares: RecordPNCPostpartumCare[],
): PostNatalCareResponse {
  const response = new PostNatalCareResponse();
  response.id = form.id;
  response.deliveryDate = form.deliveryDate
    ? new Date(form.deliveryDate).toISOString()
    : null;
  response.deliveryPlace = form.deliveryPlace;
  response.deliveryType = form.deliveryType;
  response.babySex = form.babySex;
  response.babyWeightInKg = form.babyWeightInKg
    ? Number(form.babyWeightInKg)
    : null;
  response.criedImmediatelyAfterBirth = form.criedImmediatelyAfterBirth;
  response.initiatedBreastfeeding = form.initiatedBreastfeeding;
  response.vitaminKInjection = form.vitaminKInjection;
  response.hemoglobinInPercent = form.hemoglobinInPercent;
  response.familyPlanningCounselling = form.familyPlanningCounselling;
  response.deliveryDetails = form.deliveryDetails;
  response.pregnancyOutcome = form.pregnancyOutcome;
  response.notes = form.notes;

  response.postpartumCareRecords = postpartumCares.map((care) => ({
    id: care.id,
    day: care.day,
    date: new Date(care.date)?.toISOString() || null,
    anyComplaints: care.anyComplaints,
    pallor: care.pallor,
    pulseRate: care.pulseRate,
    bloodPressure: care.bloodPressure,
    temperature: care.temperature,
    breasts: care.breasts,
    nipples: care.nipples,
    uterusTenderness: care.uterusTenderness,
    bleedingPV: care.bleedingPV,
    lochia: care.lochia,
    episiotomyTear: care.episiotomyTear,
    familyPlanningCounseling: care.familyPlanningCounseling,
    otherComplications: care.otherComplications,
    pedalEdema: care.pedalEdema,
  }));

  return response;
}

export function mapToPostNatalCareMetaResponse(
  users: object[],
  form: RecordPostNatalCare,
): PostNatalCareMetaResponse {
  const response = new PostNatalCareMetaResponse();
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
