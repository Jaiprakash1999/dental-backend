import { RecordPostNatalCare } from 'src/entities/dynamic/records_post_natal_care.entity';
import { PostNatalCareCreate } from '../dtos/request/post_natal_care_create.request';
import { PostNatalCareUpdate } from '../dtos/request/post_natal_care_update.request';
import { PNCPostpartumCareCreate } from '../dtos/request/pnc_postpartum_care_create.request';
import { RecordPNCPostpartumCare } from 'src/entities/dynamic/records_pnc_post_partum_care.entity';
import { PNCPostpartumCareUpdate } from '../dtos/request/pnc_postpartum_care_update.request';

export function mapRequestToPostNatalCare(
  userId: number,
  body: PostNatalCareCreate,
): RecordPostNatalCare {
  const form = new RecordPostNatalCare();

  // Metadata
  form.createdBy = userId;

  // Mapping fields
  form.patientId = body.patientId;
  form.deliveryDetails = body.deliveryDetails;
  form.deliveryDate = body.deliveryDate;
  form.deliveryPlace = body.deliveryPlace;
  form.pregnancyOutcome = body.pregnancyOutcome;
  form.deliveryType = body.deliveryType;
  form.babySex = body.babySex;
  form.babyWeightInKg = body.babyWeightInKg;
  form.hemoglobinInPercent = body.hemoglobinInPercent;
  form.criedImmediatelyAfterBirth = body.criedImmediatelyAfterBirth;
  form.initiatedBreastfeeding = body.initiatedBreastfeeding;
  form.vitaminKInjection = body.vitaminKInjection;
  form.familyPlanningCounselling = body.familyPlanningCounselling;
  form.notes = body.notes;
  return form;
}

export function mapRequestToPncPostPartumCare(
  postNatalCareId: string,
  body: PNCPostpartumCareCreate,
  order: number,
): RecordPNCPostpartumCare {
  const form = new RecordPNCPostpartumCare();

  // Mapping fields
  form.order = order;
  form.postNatalCareId = postNatalCareId;
  form.day = body.day;
  form.date = body.date;
  form.anyComplaints = body.anyComplaints;
  form.pallor = body.pallor;
  form.pulseRate = body.pulseRate;
  form.bloodPressure = body.bloodPressure;
  form.temperature = body.temperature;
  form.breasts = body.breasts;
  form.nipples = body.nipples;
  form.uterusTenderness = body.uterusTenderness;
  form.bleedingPV = body.bleedingPV;
  form.lochia = body.lochia;
  form.episiotomyTear = body.episiotomyTear;
  form.pedalEdema = body.pedalEdema;
  form.familyPlanningCounseling = body.familyPlanningCounselling;
  form.otherComplications = body.otherComplications;
  return form;
}

export function mapUpdateToPostNatalCare(
  userId: number,
  form: RecordPostNatalCare,
  body: PostNatalCareUpdate,
): RecordPostNatalCare {
  // Metadata
  form.updatedBy = userId;

  // Updating fields if provided
  form.deliveryDetails = body.deliveryDetails;
  form.deliveryDate = body.deliveryDate;
  form.deliveryPlace = body.deliveryPlace;
  form.pregnancyOutcome = body.pregnancyOutcome;
  form.deliveryType = body.deliveryType;
  form.babySex = body.babySex;
  form.babyWeightInKg = body.babyWeightInKg;
  form.hemoglobinInPercent = body.hemoglobinInPercent;
  form.criedImmediatelyAfterBirth = body.criedImmediatelyAfterBirth;
  form.initiatedBreastfeeding = body.initiatedBreastfeeding;
  form.vitaminKInjection = body.vitaminKInjection;
  form.familyPlanningCounselling = body.familyPlanningCounselling;
  form.notes = body.notes;
  return form;
}

export function mapUpdatePncToPostpartumCare(
  form: RecordPNCPostpartumCare,
  body: PNCPostpartumCareUpdate,
): RecordPNCPostpartumCare {
  // Updating fields if provided
  form.day = body.day;
  form.date = body.date;
  form.anyComplaints = body.anyComplaints;
  form.pallor = body.pallor;
  form.pulseRate = body.pulseRate;
  form.bloodPressure = body.bloodPressure;
  form.temperature = body.temperature;
  form.breasts = body.breasts;
  form.nipples = body.nipples;
  form.uterusTenderness = body.uterusTenderness;
  form.bleedingPV = body.bleedingPV;
  form.lochia = body.lochia;
  form.episiotomyTear = body.episiotomyTear;
  form.pedalEdema = body.pedalEdema;
  form.familyPlanningCounseling = body.familyPlanningCounseling;
  form.otherComplications = body.otherComplications;
  return form;
}
