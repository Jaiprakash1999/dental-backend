import { BroadCast } from '../entities/dynamic/broadcast.entity';
import { Patient } from '../entities/dynamic/patient.entity';
import { Visit } from '../entities/dynamic/visit.entity';
import { Chat } from '../entities/dynamic/chat.entity';
import { RecordANCAntenatalVisit } from '../entities/dynamic/records_anc_antenatal_visit.entity';
import { RecordAntenatalCare } from '../entities/dynamic/records_antenatal_care.entity';
import { RecordPregnancyOverview } from '../entities/dynamic/records_bd_po.entity';
import { RecordCareOfBaby } from '../entities/dynamic/records_care_of_baby.entity';
import { RecordCOBBabyCare } from '../entities/dynamic/records_cob_baby_care.entity';
import { RecordPNCPostpartumCare } from '../entities/dynamic/records_pnc_post_partum_care.entity';
import { RecordPrescriptionRx } from '../entities/dynamic/records_prescription_rx.entity';
import { RecordPrescription } from '../entities/dynamic/records_prescription.entity';
import { RecordScreeningForm } from '../entities/dynamic/records_screening_form.entity';
import { RecordSFLabInvestigations } from '../entities/dynamic/records_sf_lab_investigations.entity';
import { RecordVaccinationForm } from '../entities/dynamic/records_vaccination_form.entity';
import { RecordVitalForm } from '../entities/dynamic/records_vital_form.entity';
import { RecordPostNatalCare } from '../entities/dynamic/records_post_natal_care.entity';
import { TemplateRx } from '../entities/dynamic/template_rx.entity';
import { Template } from '../entities/dynamic/template.entity';
import { VisitStatus } from './enums/visit_status.enum';
import axios from 'axios';
import { RecordANCOptionalInvestigation } from 'src/entities/dynamic/records_anc_optional_investigations.entity';
import { PatientTag } from './enums/patient_tags.enum';
import { BloodGroup } from './enums/blood_group.enum';
import { CRY_CONDITION } from './enums/cryCondition.enum';
import { FEEDING_CONDITION } from './enums/feedingCondition.enum';
import { ABDOMEN_CONDITION } from './enums/abdomenCondition.enum';
import { Breasts } from './enums/breasts.enum';
import { NIPPLES } from './enums/nipples.enum';
import { UTERUS_TENDERNESS } from './enums/uterusTenderness.enum';
import { BLEEDING_PV } from './enums/bleedingPv.enum';
import { LOCHIA } from './enums/lochia.enum';
import { EPISIOTOMY_TEAR } from './enums/episiotomyTear.enum';
import { Gender } from './enums/gender.enum';
import { VisitType } from './enums/visit_type.enum';
import { VisitTags } from './enums/visit_tags.enum';
import { MMUUnit } from './enums/mmu_unit.enum';

export async function mapEntity(entityType: string, body: any) {
  switch (entityType) {
    case 'broadCast':
      const broadcast = new BroadCast();
      broadcast.id = body.id;
      broadcast.senderId = +body.sender_id;
      broadcast.receiverType = body.receiver_type ? body.receiver_type : null;
      broadcast.subject = body.subject ? body.subject : null;
      broadcast.message = body.message ? body.message : null;
      broadcast.createdAt = new Date(body.created_at);
      broadcast.updatedAt = new Date(body.updated_at);
      return broadcast;

    case 'chat':
      const chat = new Chat();
      chat.id = body.id;
      chat.senderId = +body.sender_id;
      chat.receiverId = +body.receiver_id;
      chat.message = body.message ? body.message : null;
      chat.createdAt = new Date(body.created_at);
      chat.updatedAt = new Date(body.updated_at);
      return chat;

    case 'patient':
      const patient = new Patient();
      patient.id = body.id;
      patient.name = body.name;
      patient.soundexValue = body.soundex_value ? body.soundex_value : null;
      patient.fatherSoundexValue = body.father_soundex_value
        ? body.father_soundex_value
        : null;
      patient.fatherName = body.father_name;
      patient.gender = body.gender;
      patient.dateOfBirth = body.date_of_birth ? +body.date_of_birth : null;
      patient.monthOfBirth = body.month_of_birth ? +body.month_of_birth : null;
      patient.yearOfBirth = +body.year_of_birth;
      patient.phoneNumber = body.phone_number ? body.phone_number : null;
      patient.patientTag =
        body.patient_tag &&
        Object.values(PatientTag).includes(body.patient_tag as PatientTag)
          ? (body.patient_tag as PatientTag)
          : null;

      patient.bloodGroup =
        body.blood_group && Object.keys(BloodGroup).includes(body.blood_group)
          ? BloodGroup[body.blood_group as keyof typeof BloodGroup]
          : null;
      patient.thumbnail = body.thumbnail ? body.thumbnail : null;
      patient.photo = body.photo ? body.photo : null;
      patient.habitat = +body.habitat;
      patient.line = body.line ? body.line : null;
      patient.district = body.district ? body.district : null;
      patient.pincode = body.pincode ? body.pincode : null;
      patient.city = body.city ? body.city : null;
      patient.state = body.state ? body.state : null;
      patient.tehsil = body.tehsil ? body.tehsil : null;
      patient.createdAt = new Date(body.created_at);
      patient.updatedAt = new Date(body.updated_at);
      patient.createdBy = +body.created_by;
      patient.updatedBy = body.updated_by ? +body.updated_by : null;
      patient.isDelete = body.is_delete;
      return patient;

    case 'record_anc_antenatal_visit':
      const ancVisit = new RecordANCAntenatalVisit();
      ancVisit.id = body.id;
      ancVisit.order = +body.order;
      ancVisit.day = body.day;
      ancVisit.date = body.date_of_visit ? new Date(body.date_of_visit) : null;
      ancVisit.complaints = body.visit_complaints
        ? body.visit_complaints
        : null;
      ancVisit.pogWeeks = body.period_of_gestation_weeks
        ? +body.period_of_gestation_weeks
        : null;
      ancVisit.weightInKg = body.weight_in_kg ? +body.weight_in_kg : null;
      ancVisit.pulseRateInBpm = body.pulse_rate_in_bpm
        ? +body.pulse_rate_in_bpm
        : null;
      ancVisit.bloodPressure = body.blood_pressure ? body.blood_pressure : null;
      ancVisit.pallor = body.pallor ? body.pallor : null;
      ancVisit.oedema = body.oedema ? body.oedema : null;
      ancVisit.jaundice = body.jaundice_observation
        ? body.jaundice_observation
        : null;
      ancVisit.fundalHeight = body.fundal_height ? body.fundal_height : null;
      ancVisit.liePresentation = body.lie_presentation
        ? body.lie_presentation
        : null;
      ancVisit.fetalMovements = body.fetal_movements
        ? body.fetal_movements
        : null;
      ancVisit.fetalHeartRatePerMin = body.fetal_heart_rate_per_min
        ? +body.fetal_heart_rate_per_min
        : null;
      ancVisit.pvIfDone = body.pv_if_done ? body.pv_if_done : null;
      ancVisit.haemoglobin = body.haemoglobin ? body.haemoglobin : null;
      ancVisit.hivScreening = body.hiv_screening ? body.hiv_screening : null;
      ancVisit.vdrl = body.vdrl ? body.vdrl : null;
      ancVisit.hbsAg = body.hbs_ag ? body.hbs_ag : null;
      ancVisit.bloodSugar = body.blood_sugar ? body.blood_sugar : null;
      ancVisit.urineAlbumin = body.urine_albumin ? body.urine_albumin : null;
      ancVisit.urineSugar = body.urine_sugar ? body.urine_sugar : null;
      ancVisit.ultraSonography = body.ultra_sonography
        ? body.ultra_sonography
        : null;
      ancVisit.antenatalCareId = body.antenatal_care_id;
      ancVisit.createdAt = new Date(body.created_at);
      ancVisit.updatedAt = new Date(body.updated_at);
      ancVisit.isDelete = body.is_delete;
      return ancVisit;

    case 'record_anc_optional_investigation':
      const optionalInvestigation = new RecordANCOptionalInvestigation();
      optionalInvestigation.id = body.id;
      optionalInvestigation.date = body.date ? new Date(body.date) : null;
      optionalInvestigation.order = +body.order;
      optionalInvestigation.title = body.title;
      optionalInvestigation.value = body.value;
      optionalInvestigation.antenatalCareId = body.antenatal_care_id;
      optionalInvestigation.createdAt = new Date(body.created_at);
      optionalInvestigation.updatedAt = new Date(body.updated_at);
      optionalInvestigation.isDelete = body.is_delete;
      return optionalInvestigation;

    case 'record_antenatal_care':
      const antenatalCare = new RecordAntenatalCare();
      antenatalCare.id = body.id;
      antenatalCare.patientId = body.patient_id;
      antenatalCare.pastSurgicalHistory = body.past_surgical_history
        ? body.past_surgical_history
        : null;
      antenatalCare.pastMedicalHistory = body.past_medical_history
        ? body.past_medical_history
        : null;
      antenatalCare.treatmentHistory = body.treatment_history
        ? body.treatment_history
        : null;
      antenatalCare.apH = body.aph ? body.apH : null;
      antenatalCare.eclampsia = body.eclampsia ? body.eclampsia : null;
      antenatalCare.piH = body.pih ? body.piH : null;
      antenatalCare.anaemia = body.anaemia ? body.anaemia : null;
      antenatalCare.obstructedLabor = body.obstructed_labor
        ? body.obstructed_labor
        : null;
      antenatalCare.pPH = body.pph ? body.pph : null;
      antenatalCare.lSCS = body.lscs ? body.lscs : null;
      antenatalCare.congenitalAnomaly = body.congenital_anomaly
        ? body.congenital_anomaly
        : null;
      antenatalCare.otherComplications = body.other_complications
        ? body.other_complications
        : null;
      antenatalCare.tuberculosis = body.tuberculosis ? body.tuberculosis : null;
      antenatalCare.hypertension = body.hypertension ? body.hypertension : null;
      antenatalCare.heartDisease = body.heart_disease
        ? body.heart_disease
        : null;
      antenatalCare.diabetes = body.diabetes ? body.diabetes : null;
      antenatalCare.asthma = body.asthma ? body.asthma : null;
      antenatalCare.otherMedicalHistory = body.other_past_history
        ? body.other_past_history
        : null;
      antenatalCare.gplad = body.gplad ? body.gplad : null;
      antenatalCare.previousDelivery = body.previous_delivery
        ? body.previous_delivery
        : null;
      antenatalCare.previousChildren = body.previous_children
        ? convertCommaSeparatedToArray(body.previous_children)
        : null;
      antenatalCare.heart = body.heart ? body.heart : null;
      antenatalCare.lungs = body.lungs ? body.lungs : null;
      antenatalCare.breasts = body.breasts ? body.breasts : null;
      antenatalCare.thyroid = body.thyroid ? body.thyroid : null;
      antenatalCare.spine = body.spine ? body.spine : null;
      antenatalCare.gait = body.gait ? body.gait : null;
      antenatalCare.urinePregnancyTest = body.urine_pregnancy_test;
      antenatalCare.urinePregnancyTestDate = body.urine_pregnancy_test_date
        ? new Date(body.urine_pregnancy_test_date)
        : null;
      antenatalCare.bloodGroupRhTyping = body.blood_group_rh_typing
        ? body.blood_group_rh_typing
        : null;
      antenatalCare.bloodGroupRhTypingDate = body.blood_group_rh_typing_date
        ? new Date(body.blood_group_rh_typing_date)
        : null;
      antenatalCare.notes = body.notes ? body.notes : null;
      antenatalCare.createdBy = +body.created_by;
      antenatalCare.updatedBy = body.updated_by ? +body.updated_by : null;
      antenatalCare.createdAt = new Date(body.created_at);
      antenatalCare.updatedAt = new Date(body.updated_at);
      antenatalCare.isDelete = body.is_delete;
      return antenatalCare;

    case 'record_pregnancy_overview':
      const pregnancyOverview = new RecordPregnancyOverview();
      pregnancyOverview.id = body.id;
      pregnancyOverview.patientId = body.patient_id;
      pregnancyOverview.tubectomyDate = body.tubectomy_date
        ? new Date(body.tubectomy_date)
        : null;
      pregnancyOverview.isTubectomyCompleted = body.is_tubectomy_completed
        ? body.is_tubectomy_completed
        : null;
      pregnancyOverview.isPregnancyRiskHigh = body.is_pregnancy_risk_high
        ? convertCommaSeparatedToArray(body.is_pregnancy_risk_high)
        : null;
      pregnancyOverview.pregnancyOutcomeNote = body.pregnancy_outcome_note
        ? body.pregnancy_outcome_note
        : null;
      pregnancyOverview.motherName = body.mother_name ? body.mother_name : null;
      pregnancyOverview.motherAge = body.mother_age ? +body.mother_age : null;
      pregnancyOverview.motherMobileNumber = body.mother_mobile_number
        ? body.mother_mobile_number
        : null;
      pregnancyOverview.fatherName = body.father_name ? body.father_name : null;
      pregnancyOverview.fatherAge = body.father_age ? +body.father_age : null;
      pregnancyOverview.fatherMobileNumber = body.father_mobile_number
        ? body.father_mobile_number
        : null;
      pregnancyOverview.address = body.address ? body.address : null;
      pregnancyOverview.motherId = body.mother_id ? body.mother_id : null;
      pregnancyOverview.bankName = body.bank_name ? body.bank_name : null;
      pregnancyOverview.accountNumber = body.account_number
        ? body.account_number
        : null;
      pregnancyOverview.ifscCode = body.ifsc_code ? body.ifsc_code : null;
      pregnancyOverview.dolmp = body.date_last_menstrual_period
        ? new Date(body.date_last_menstrual_period)
        : null;
      pregnancyOverview.edd = body.expected_date_of_delivery
        ? new Date(body.expected_date_of_delivery)
        : null;
      pregnancyOverview.currentDeliveryAt = body.current_delivery_at
        ? body.current_delivery
        : null;
      pregnancyOverview.lastDeliveryAt = body.last_delivery_at
        ? body.last_delivery_at
        : null;
      pregnancyOverview.childName = body.child_name ? body.child_name : null;
      pregnancyOverview.dateOfBirth = body.date_of_birth
        ? new Date(body.date_of_birth)
        : null;
      pregnancyOverview.birthWeightInKg = body.birth_weight_in_kg
        ? body.birth_weight_in_kg
        : null;
      pregnancyOverview.gender = body.gender ? body.gender : null;
      pregnancyOverview.birthRegistrationNumber = body.birth_registration_number
        ? body.birth_registration_number
        : null;
      pregnancyOverview.childIdNumber = body.child_id_number
        ? body.child_id_number
        : null;
      pregnancyOverview.anmName = body.anm_name ? body.anm_name : null;
      pregnancyOverview.anmContact = body.anm_contact ? body.anm_contact : null;
      pregnancyOverview.chwName = body.chw_name ? body.chw_name : null;
      pregnancyOverview.chwContact = body.chw_contact ? body.chw_contact : null;
      pregnancyOverview.phcName = body.phc_name ? body.phc_name : null;
      pregnancyOverview.phcHospitalName = body.hospital_name
        ? body.hospital_name
        : null;
      pregnancyOverview.referralTo = body.referral_to ? body.referral_to : null;
      pregnancyOverview.notes = body.notes ? body.notes : null;
      pregnancyOverview.createdBy = +body.created_by;
      pregnancyOverview.updatedBy = body.updated_by ? +body.updated_by : null;
      pregnancyOverview.createdAt = new Date(body.created_at);
      pregnancyOverview.updatedAt = new Date(body.updated_at);
      pregnancyOverview.isDelete = body.is_delete;
      return pregnancyOverview;

    case 'record_care_of_baby':
      const careOfBaby = new RecordCareOfBaby();
      careOfBaby.id = body.id;
      careOfBaby.firstExaminationDateTime = body.first_examination_date_time
        ? new Date(body.first_examination_date_time)
        : null;
      careOfBaby.firstFeedAfterBirth = body.first_feed_after_birth
        ? body.first_feed_after_birth
        : null;
      careOfBaby.firstBreastfeedTime = body.first_breastfeed_time
        ? new Date(body.first_breastfeed_time)
        : null;
      careOfBaby.howFeed = body.how_feed ? body.how_feed : null;
      careOfBaby.weakSuckReason = body.weak_suck_reason
        ? body.weak_suck_reason
        : null;
      careOfBaby.dryBaby = body.dry_baby ? body.dry_baby : null;
      careOfBaby.keptWarm = body.kept_warm ? body.kept_warm : null;
      careOfBaby.dontBath = body.dont_bath ? body.dont_bath : null;
      careOfBaby.wrappedCloseToMother = body.wrapped_close_to_mother
        ? body.wrapped_close_to_mother
        : null;
      careOfBaby.exclusivelyBreastfed = body.exclusively_breastfed
        ? body.exclusively_breastfed
        : null;
      careOfBaby.cordCare = body.cord_care ? body.cord_care : null;
      careOfBaby.unusualFindings = body.unusual_findings
        ? body.unusual_findings
        : null;
      careOfBaby.referredToHigherCentre = body.referred_to_higher_centre;
      careOfBaby.referralReason = body.referral_reason;
      careOfBaby.notes = body.notes;
      careOfBaby.patientId = body.patient_id;
      careOfBaby.createdBy = +body.created_by;
      careOfBaby.updatedBy = body.updated_by ? +body.updated_by : null;
      careOfBaby.createdAt = new Date(body.created_at);
      careOfBaby.updatedAt = new Date(body.updated_at);
      careOfBaby.isDelete = body.is_delete;
      return careOfBaby;

    case 'record_cob_baby_care':
      const cobBabyCare = new RecordCOBBabyCare();
      cobBabyCare.id = body.id;
      cobBabyCare.careOfBabyId = body.care_of_baby_id
        ? body.care_of_baby_id
        : null;

      cobBabyCare.order = body.order ? +body.order : null;
      cobBabyCare.day = body.day ? body.day : null;
      cobBabyCare.date = body.examination_date
        ? new Date(body.examination_date)
        : null;
      cobBabyCare.weightInKg = body.baby_weight_in_kg
        ? +body.baby_weight_in_kg
        : null;
      cobBabyCare.temperatureInCelsius = body.temperature_in_celsius
        ? +body.temperature_in_celsius
        : null;
      cobBabyCare.urineOutput = body.urine_output ? body.urine_output : null;
      cobBabyCare.stoolPattern = body.stool_pattern ? body.stool_pattern : null;
      cobBabyCare.eyesCondition = body.eyes_condition
        ? body.eyes_condition
        : null;
      cobBabyCare.skinCondition = body.skin_condition
        ? body.skin_condition
        : null;
      cobBabyCare.skinFoldCondition = body.skin_fold_condition
        ? body.skin_fold_condition
        : null;
      cobBabyCare.yellowEyes = body.yellow_eyes ? body.yellow_eyes : null;
      cobBabyCare.yellowSkin = body.yellow_skin ? body.yellow_skin : null;
      cobBabyCare.umbilicalCordBleed = body.umbilical_cord_bleed
        ? body.umbilical_cord_bleed
        : null;
      cobBabyCare.cleanThreadUsed = body.clean_thread_used
        ? body.clean_thread_used
        : null;
      cobBabyCare.feedingCondition =
        body.feeding_condition &&
        Object.values(FEEDING_CONDITION).includes(
          body.feeding_condition as FEEDING_CONDITION,
        )
          ? (body.feeding_condition as FEEDING_CONDITION)
          : null;
      cobBabyCare.cryCondition =
        body.cry_condition &&
        Object.values(CRY_CONDITION).includes(
          body.cry_condition as CRY_CONDITION,
        )
          ? (body.cry_condition as CRY_CONDITION)
          : null;
      cobBabyCare.abdomenCondition =
        body.abdomen_condition &&
        Object.values(ABDOMEN_CONDITION).includes(
          body.abdomen_condition as ABDOMEN_CONDITION,
        )
          ? (body.abdomen_condition as ABDOMEN_CONDITION)
          : null;
      cobBabyCare.coldToTouch = body.cold_to_touch ? body.cold_to_touch : null;
      cobBabyCare.chestIndrawn = body.chest_indrawn ? body.chest_indrawn : null;
      cobBabyCare.pusOnUmbilicus = body.pus_on_umbilicus
        ? body.pus_on_umbilicus
        : null;
      cobBabyCare.respiratoryRate = body.respiratory_rate
        ? body.respiratory_rate
        : null;

      cobBabyCare.createdAt = new Date(body.created_at);
      cobBabyCare.updatedAt = new Date(body.updated_at);
      cobBabyCare.isDelete = body.is_delete;
      return cobBabyCare;

    case 'record_pnc_postpartum_care':
      const pncPostpartumCare = new RecordPNCPostpartumCare();
      pncPostpartumCare.id = body.id;
      pncPostpartumCare.order = +body.order;
      pncPostpartumCare.day = body.day ? body.day : null;
      pncPostpartumCare.date = body.date_of_postpartum_care
        ? new Date(body.date_of_postpartum_care)
        : null;
      pncPostpartumCare.anyComplaints = body.any_complaints
        ? body.any_complaints
        : null;
      pncPostpartumCare.pallor = body.pallor ? body.pallor : null;
      pncPostpartumCare.pulseRate = body.pulse_rate ? body.pulse_rate : null;
      pncPostpartumCare.bloodPressure = body.blood_pressure
        ? body.blood_pressure
        : null;
      pncPostpartumCare.temperature = body.temperature
        ? +body.temperature
        : null;
      pncPostpartumCare.breasts =
        body.breasts_condition &&
        Object.values(Breasts).includes(body.breasts_condition as Breasts)
          ? (body.breasts_condition as Breasts)
          : null;
      pncPostpartumCare.nipples =
        body.nipples_condition &&
        Object.values(NIPPLES).includes(body.nipples_condition as NIPPLES)
          ? (body.nipples_condition as NIPPLES)
          : null;
      pncPostpartumCare.uterusTenderness =
        body.uterus_tenderness &&
        Object.values(UTERUS_TENDERNESS).includes(
          body.uterus_tenderness as UTERUS_TENDERNESS,
        )
          ? (body.uterus_tenderness as UTERUS_TENDERNESS)
          : null;
      pncPostpartumCare.bleedingPV =
        body.bleeding_pv &&
        Object.values(BLEEDING_PV).includes(body.bleeding_pv as BLEEDING_PV)
          ? (body.bleeding_pv as BLEEDING_PV)
          : null;
      pncPostpartumCare.lochia =
        body.lochia_condition &&
        Object.values(LOCHIA).includes(body.lochia_condition as LOCHIA)
          ? (body.lochia_condition as LOCHIA)
          : null;
      pncPostpartumCare.episiotomyTear =
        body.episiotomy_tear_condition &&
        Object.values(EPISIOTOMY_TEAR).includes(
          body.episiotomy_tear_condition as EPISIOTOMY_TEAR,
        )
          ? (body.episiotomy_tear_condition as EPISIOTOMY_TEAR)
          : null;
      pncPostpartumCare.pedalEdema = body.pedal_edema ? body.pedal_edema : null;
      pncPostpartumCare.familyPlanningCounseling =
        body.family_planning_counseling
          ? body.family_planning_counseling
          : null;
      pncPostpartumCare.otherComplications = body.other_complications
        ? body.other_complications
        : null;
      pncPostpartumCare.postNatalCareId = body.post_natal_care_id;
      pncPostpartumCare.createdAt = new Date(body.created_at);
      pncPostpartumCare.updatedAt = new Date(body.updated_at);
      pncPostpartumCare.isDelete = body.is_delete;
      return pncPostpartumCare;

    case 'record_post_natal_care':
      const postNatalCare = new RecordPostNatalCare();
      postNatalCare.id = body.id;
      postNatalCare.patientId = body.patient_id;
      postNatalCare.deliveryDate = body.delivery_date
        ? new Date(body.delivery_date)
        : null;
      postNatalCare.deliveryDetails = body.delivery_details
        ? body.delivery_details
        : null;
      postNatalCare.deliveryPlace = body.delivery_place
        ? body.delivery_place
        : null;
      postNatalCare.deliveryDetails = body.delivery_details
        ? body.deliveryDetails
        : null;
      postNatalCare.deliveryType = body.delivery_type
        ? body.delivery_type
        : null;
      postNatalCare.babySex =
        body.baby_sex && Object.values(Gender).includes(body.baby_sex as Gender)
          ? (body.baby_sex as Gender)
          : null;
      postNatalCare.babyWeightInKg = body.baby_weight_in_kg
        ? +body.baby_weight_in_kg
        : null;
      postNatalCare.hemoglobinInPercent = body.hemoglobin_in_percent
        ? +body.hemoglobin_in_percent
        : null;
      postNatalCare.criedImmediatelyAfterBirth =
        body.cried_immediately_after_birth
          ? body.cried_immediately_after_birth
          : null;
      postNatalCare.initiatedBreastfeeding = body.initiated_breastfeeding
        ? body.initiated_breastfeeding
        : null;
      postNatalCare.vitaminKInjection = body.vitamin_k_injection
        ? body.vitamin_k_injection
        : null;
      postNatalCare.familyPlanningCounselling = body.family_planning_counseling
        ? convertCommaSeparatedToArray(body.family_planning_counseling)
        : null;
      postNatalCare.notes = body.notes ? body.notes : null;
      postNatalCare.createdBy = +body.created_by;
      postNatalCare.updatedBy = body.updated_by ? +body.updated_by : null;
      postNatalCare.createdAt = new Date(body.created_at);
      postNatalCare.updatedAt = new Date(body.updated_at);
      postNatalCare.isDelete = body.is_delete;
      return postNatalCare;

    case 'record_prescription_rx':
      const prescriptionRx = new RecordPrescriptionRx();
      prescriptionRx.id = body.id;
      prescriptionRx.drugName = body.drug_name;
      prescriptionRx.dose = body.dose ? body.dose : null;
      prescriptionRx.measurement = body.measurement ? body.measurement : null;
      prescriptionRx.timing = body.timing ? body.timing : null;
      prescriptionRx.duration = body.duration ? body.duration : null;
      prescriptionRx.frequency = body.frequency ? body.frequency : null;
      prescriptionRx.notes = body.notes ? body.notes : null;
      prescriptionRx.prescriptionId = body.prescription_id;
      prescriptionRx.createdAt = new Date(body.created_at);
      prescriptionRx.updatedAt = new Date(body.updated_at);
      prescriptionRx.isDelete = body.is_delete;
      return prescriptionRx;

    case 'record_prescription':
      const prescription = new RecordPrescription();
      prescription.id = body.id;
      prescription.chiefComplaint = body.chief_complaints
        ? convertCommaSeparatedToArray(body.chief_complaints)
        : null;
      prescription.followUp = body.follow_up ? body.follow_up : null;
      prescription.lifeStyleRecommendations = body.lifestyle_recommendations
        ? convertCommaSeparatedToArray(body.lifestyle_recommendations)
        : null;
      prescription.instructions = body.instructions
        ? convertCommaSeparatedToArray(body.instructions)
        : null;
      prescription.diagnosis = body.diagnosis
        ? convertCommaSeparatedToArray(body.diagnosis)
        : null;
      prescription.labInvestigations = body.lab_investigations
        ? convertCommaSeparatedToArray(body.lab_investigations)
        : null;
      prescription.visitId = body.visit_id;
      prescription.patientId = body.patient_id;
      prescription.createdBy = +body.created_by;
      prescription.updatedBy = body.updated_by ? +body.updated_by : null;
      prescription.createdAt = new Date(body.created_at);
      prescription.updatedAt = new Date(body.updated_at);
      prescription.signature = body.signature ? body.signature : null;
      prescription.stamp = body.stamp ? body.stamp : null;
      prescription.isDelete = body.is_delete;
      return prescription;

    case 'record_screening_form':
      const screeningForm = new RecordScreeningForm();
      screeningForm.id = body.id;
      screeningForm.diagnosis = body.diagnosis ? body.diagnosis : null;
      screeningForm.patientId = body.patient_id;
      screeningForm.notes = body.notes;
      screeningForm.createdBy = +body.created_by;
      screeningForm.lastUpdatedBy = body.last_updated_by
        ? +body.last_updated_by
        : null;
      screeningForm.createdAt = new Date(body.created_at);
      screeningForm.updatedAt = new Date(body.updated_at);
      screeningForm.isDelete = body.is_delete;
      return screeningForm;

    case 'record_sf_lab_investigations':
      const sfLabInvestigations = new RecordSFLabInvestigations();
      sfLabInvestigations.id = body.id;
      sfLabInvestigations.labInvestigation = body.lab_investigation;
      sfLabInvestigations.result = body.result ? body.result : null;
      sfLabInvestigations.note = body.note ? body.note : null;
      sfLabInvestigations.screeningFormId = body.screening_form_id;
      sfLabInvestigations.createdAt = new Date(body.created_at);
      sfLabInvestigations.updatedAt = new Date(body.updated_at);
      sfLabInvestigations.isDelete = body.is_delete;
      return sfLabInvestigations;

    case 'record_vaccination_form':
      const vaccinationForm = new RecordVaccinationForm();
      vaccinationForm.id = body.id;
      vaccinationForm.patientId = body.patient_id;
      vaccinationForm.dateOfBirth = new Date(body.date_of_birth);
      vaccinationForm.bcg = body.bcg ? body.bcg : null;
      vaccinationForm.opv0 = body.opv_zero ? body.opv_zero : null;
      vaccinationForm.hepatitisB = body.hepatitis_b ? body.hepatitis_b : null;
      vaccinationForm.opv1 = body.opv_one ? body.opv_one : null;
      vaccinationForm.pentavalent1 = body.pentavalent_one
        ? body.pentavalent_one
        : null;
      vaccinationForm.rvv1 = body.rvv_one ? body.rvv_one : null;
      vaccinationForm.fipv1 = body.fipv_one ? body.fipv_one : null;
      vaccinationForm.pcv1 = body.pcv_one ? body.pcv_one : null;
      vaccinationForm.opv2 = body.opv_two ? body.opv_two : null;
      vaccinationForm.pentavalent2 = body.pentavalent_two
        ? body.pentavalent_two
        : null;
      vaccinationForm.rvv2 = body.rvv_two ? body.rvv_two : null;
      vaccinationForm.opv3 = body.opv_three ? body.opv_three : null;
      vaccinationForm.pentavalent3 = body.pentavalent_three
        ? body.pentavalent_three
        : null;
      vaccinationForm.fipv2 = body.fipv_two ? body.fipv_two : null;
      vaccinationForm.rvv3 = body.rvv_three ? body.rvv_three : null;
      vaccinationForm.pcv2 = body.pcv_two ? body.pcv_two : null;
      vaccinationForm.mr1 = body.mr_one ? body.mr_one : null;
      vaccinationForm.je1 = body.je_one ? body.je_one : null;
      vaccinationForm.pcvBooster = body.pcv_booster ? body.pcv_booster : null;
      vaccinationForm.mr2 = body.mr_two ? body.mr_two : null;
      vaccinationForm.je2 = body.je_two ? body.je_two : null;
      vaccinationForm.diphtheria = body.diphtheria ? body.diphtheria : null;
      vaccinationForm.dptBooster1 = body.dpt_booster_one
        ? body.dpt_booster_one
        : null;
      vaccinationForm.opvBooster = body.opv_booster ? body.opv_booster : null;
      vaccinationForm.dptBooster2 = body.dpt_booster_two
        ? body.dpt_booster_two
        : null;
      vaccinationForm.notes = body.notes ? body.notes : null;
      vaccinationForm.createdBy = +body.created_by;
      vaccinationForm.lastUpdatedBy = body.last_updated_by
        ? +body.last_updated_by
        : null;
      vaccinationForm.createdAt = new Date(body.created_at);
      vaccinationForm.updatedAt = new Date(body.updated_at);
      vaccinationForm.isDelete = body.is_delete;
      return vaccinationForm;

    case 'record_vital_form':
      const vitalForm = new RecordVitalForm();
      vitalForm.id = body.id;
      vitalForm.weightInKg = body.weight_in_kg ? +body.weight_in_kg : null;
      vitalForm.heightInCm = body.height_in_cm ? +body.height_in_cm : null;
      vitalForm.hemoglobinInPercent = body.hemoglobin_in_percent
        ? +body.hemoglobin_in_percent
        : null;
      vitalForm.heart = body.heart_rate_in_bpm ? body.heart_rate_in_bpm : null;
      vitalForm.lungs = body.lungs_condition ? body.lungs_condition : null;
      vitalForm.bloodPressure = body.blood_pressure
        ? body.blood_pressure
        : null;
      vitalForm.spo2InPercent = body.spo2_in_percent
        ? +body.spo2_in_percent
        : null;
      vitalForm.respiratoryRateInBpm = body.respiratory_rate_in_bpm
        ? +body.respiratory_rate_in_bpm
        : null;
      vitalForm.pulseRateInBpm = body.pulse_rate_in_bpm
        ? +body.pulse_rate_in_bpm
        : null;
      vitalForm.tempInCelsius = body.temperature_in_celsius
        ? +body.temperature_in_celsius
        : null;
      vitalForm.notes = body.notes ? body.notes : null;
      vitalForm.visitId = body.visit_id;
      vitalForm.patientId = body.patient_id;
      vitalForm.createdBy = +body.created_by;
      vitalForm.updatedBy = body.updated_by ? +body.updated_by : null;
      vitalForm.createdAt = new Date(body.created_at);
      vitalForm.lastUpdatedAt = new Date(body.updated_at);
      vitalForm.isDelete = body.is_delete;
      return vitalForm;

    case 'template_rx':
      const templateRx = new TemplateRx();
      templateRx.id = body.id;
      templateRx.drugName = body.drug_name;
      templateRx.dose = body.dose ? body.dose : null;
      templateRx.measurement = body.measurement ? body.measurement : null;
      templateRx.timing = body.timing ? body.timing : null;
      templateRx.duration = body.duration ? body.duration : null;
      templateRx.frequency = body.frequency ? body.frequency : null;
      templateRx.notes = body.notes ? body.notes : null;
      templateRx.templateId = body.template_id;
      templateRx.createdAt = new Date(body.created_at);
      templateRx.updatedAt = new Date(body.updated_at);
      templateRx.isDelete = body.is_delete;
      return templateRx;

    case 'template':
      const template = new Template();
      template.id = body.id;
      template.chiefComplaint = body.chief_complaints
        ? convertCommaSeparatedToArray(body.chief_complaints)
        : null;
      template.followUp = body.follow_up ? body.follow_up : null;
      template.lifeStyleRecommendations = body.lifestyle_recommendations
        ? convertCommaSeparatedToArray(body.lifestyle_recommendations)
        : null;
      template.instructions = body.instructions
        ? convertCommaSeparatedToArray(body.instructions)
        : null;
      template.diagnosis = body.diagnosis
        ? convertCommaSeparatedToArray(body.diagnosis)
        : null;
      template.labInvestigations = body.lab_investigations
        ? convertCommaSeparatedToArray(body.lab_investigations)
        : null;
      template.createdBy = +body.created_by;
      template.updatedBy = body.updated_by ? +body.updated_by : null;
      template.createdAt = new Date(body.created_at);
      template.updatedAt = new Date(body.updated_at);
      template.isDelete = body.is_delete;
      template.templateName = body.template_name;
      return template;

    case 'visit':
      const visit = new Visit();
      visit.id = body.id;
      visit.patientId = body.patient_id;
      visit.doctorId = body.doctor_id ? body.doctor_id : null;
      console.log('printing the array data', body.mmu_unit);
      visit.chiefComplaint = body.chief_complaint
        ? convertCommaSeparatedToArray(body.chief_complaint)
        : null;
      visit.visitType =
        body.visit_type &&
        Object.values(VisitType).includes(body.visit_type as VisitType)
          ? (body.visit_type as VisitType)
          : null;
      visit.visitDate = body.visit_date ? new Date(body.visit_date) : null;
      visit.tags = body.tags
        ? body.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) =>
              Object.values(VisitTags).includes(tag as VisitTags),
            )
        : null;
      visit.tags = visit.tags && visit.tags.length > 0 ? visit.tags : [];
      visit.tokenNumber = body.token_number ? +body.token_number : null;
      visit.mmuUnit =
        body.mmu_unit &&
        Object.values(MMUUnit).includes(body.mmu_unit as MMUUnit)
          ? (body.mmu_unit as MMUUnit)
          : null;
      visit.visitStatus =
        body.visit_status != 'UPCOMING' &&
        Object.values(VisitStatus).includes(body.visit_status as VisitStatus)
          ? (body.visit_status as VisitStatus)
          : VisitStatus.NOTSHOW;
      visit.latitude = body.latitude ? +body.latitude : null;
      visit.longitude = body.longitude ? +body.longitude : null;
      let location;
      try {
        location = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${body.latitude}&lon=${body.longitude}&format=json`,
        );
      } catch (error) {
        console.error('Error fetching location:', error.message);
        location = null;
      }
      const address = location?.data?.address;
      if (address) {
        visit.line = null;
        visit.district = address.state_district;
        visit.city = null;
        visit.state = address.state;
        visit.tehsil = address.suburb;
        visit.pincode = address.postcode;
      }
      visit.mmuHead = body.mmu_head ? +body.mmu_head : null;
      visit.prescriptionId = body.prescription_id ? body.prescription_id : null;
      visit.createdAt = new Date(body.created_at);
      visit.updatedAt = new Date(body.updated_at);
      visit.createdBy = +body.created_by;
      visit.updatedBy = body.updated_by ? +body.updated_by : null;
      visit.isDelete = body.is_delete;
      return visit;
    default:
      throw new Error('Invalid entity type');
  }
}

export function convertCommaSeparatedToArray(input: string): string[] {
  if (!input) {
    return [];
  }
  return input.split(',').map((item) => item.trim());
}
