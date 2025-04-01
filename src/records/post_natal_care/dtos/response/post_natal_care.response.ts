import { Type } from 'class-transformer';
import { DeliveryType } from 'src/utils/enums/delivery_type.enum';
import { Gender } from 'src/utils/enums/gender.enum';
import { Breasts } from 'src/utils/enums/breasts.enum';
import { NIPPLES } from 'src/utils/enums/nipples.enum';
import { UTERUS_TENDERNESS } from 'src/utils/enums/uterusTenderness.enum';
import { BLEEDING_PV } from 'src/utils/enums/bleedingPv.enum';
import { LOCHIA } from 'src/utils/enums/lochia.enum';
import { EPISIOTOMY_TEAR } from 'src/utils/enums/episiotomyTear.enum';

class PNCPostpartumCareResponse {
  id: string;
  day: string;
  date: string;
  anyComplaints: string;
  pallor: string;
  pulseRate: string;
  bloodPressure: string;
  temperature: number;
  breasts: Breasts;
  nipples: NIPPLES;
  uterusTenderness: UTERUS_TENDERNESS;
  bleedingPV: BLEEDING_PV;
  lochia: LOCHIA;
  episiotomyTear: EPISIOTOMY_TEAR;
  familyPlanningCounseling: string;
  otherComplications: string;
  pedalEdema: boolean;
}

export class PostNatalCareResponse {
  id: string;
  deliveryDetails: string;
  deliveryDate: string;
  deliveryPlace: string;
  pregnancyOutcome: string;
  deliveryType: string;
  babySex: Gender;
  babyWeightInKg: number;
  hemoglobinInPercent?: number;
  criedImmediatelyAfterBirth: boolean;
  initiatedBreastfeeding: boolean;
  vitaminKInjection: boolean;
  familyPlanningCounselling: string[];
  notes: string;
  postpartumCareRecords: PNCPostpartumCareResponse[];
}
