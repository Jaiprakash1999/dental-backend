import { RecordCareOfBaby } from 'src/entities/dynamic/records_care_of_baby.entity';
import { CareOfBabyCreate } from '../dtos/request/care_of_baby_create.request';
import { COBBabyCareCreate } from '../dtos/request/cob_baby_care_create.request';
import { RecordCOBBabyCare } from 'src/entities/dynamic/records_cob_baby_care.entity';
import { CareOfBabyUpdate } from '../dtos/request/care_of_baby_update.request';
import { COBBabyCareUpdate } from '../dtos/request/cob_baby_care_update.request';

export function mapRequestToCareOfBaby(
  userId: number,
  body: CareOfBabyCreate,
): RecordCareOfBaby {
  const form = new RecordCareOfBaby();

  // Metadata
  form.createdBy = userId;

  // Mapping fields from request body
  form.patientId = body.patientId;
  form.firstExaminationDateTime = body.firstExaminationDateTime;
  form.firstFeedAfterBirth = body.firstFeedAfterBirth;
  form.firstBreastfeedTime = body.firstBreastfeedTime;
  form.howFeed = body.howFeed;
  form.weakSuckReason = body.weakSuckReason;
  form.dryBaby = body.dryBaby;
  form.keptWarm = body.keptWarm;
  form.dontBath = body.dontBath;
  form.wrappedCloseToMother = body.wrappedCloseToMother;
  form.exclusivelyBreastfed = body.exclusivelyBreastfed;
  form.cordCare = body.cordCare;
  form.unusualFindings = body.unusualFindings;
  form.referredToHigherCentre = body.referredToHigherCentre;
  form.referralReason = body.referralReason;
  form.notes = body.notes;
  return form;
}

export function mapRequestToCOBBabyCare(
  careOfBabyId: string,
  body: COBBabyCareCreate,
  order: number,
): RecordCOBBabyCare {
  const form = new RecordCOBBabyCare();

  // Assign foreign key
  form.careOfBabyId = careOfBabyId;

  // Mapping fields from request body
  form.day = body.day;
  form.date = body.date;
  form.weightInKg = body.weightInKg;
  form.temperatureInCelsius = body.temperatureInCelsius;
  form.urineOutput = body.urineOutput;
  form.stoolPattern = body.stoolPattern;
  form.eyesCondition = body.eyesCondition;
  form.skinCondition = body.skinCondition;
  form.skinFoldCondition = body.skinFoldCondition;
  form.yellowEyes = body.yellowEyes;
  form.yellowSkin = body.yellowSkin;
  form.umbilicalCordBleed = body.umbilicalCordBleed;
  form.cleanThreadUsed = body.cleanThreadUsed;
  form.feedingCondition = body.feedingCondition;
  form.cryCondition = body.cryCondition;
  form.abdomenCondition = body.abdomenCondition;
  form.coldToTouch = body.coldToTouch;
  form.chestIndrawn = body.chestIndrawn;
  form.pusOnUmbilicus = body.pusOnUmbilicus;
  form.respiratoryRate = body.respiratoryRate;
  form.order = order;
  return form;
}

export function mapUpdateToCareOfBaby(
  userId: number,
  form: RecordCareOfBaby,
  body: CareOfBabyUpdate,
): RecordCareOfBaby {
  // Metadata
  form.updatedBy = userId;

  // Updating fields if provided
  form.firstExaminationDateTime = body.firstExaminationDateTime;
  form.firstFeedAfterBirth = body.firstFeedAfterBirth;
  form.firstBreastfeedTime = body.firstBreastfeedTime;
  form.howFeed = body.howFeed;
  form.weakSuckReason = body.weakSuckReason;
  form.dryBaby = body.dryBaby;
  form.keptWarm = body.keptWarm;
  form.dontBath = body.dontBath;
  form.wrappedCloseToMother = body.wrappedCloseToMother;
  form.exclusivelyBreastfed = body.exclusivelyBreastfed;
  form.cordCare = body.cordCare;
  form.unusualFindings = body.unusualFindings;
  form.referredToHigherCentre = body.referredToHigherCentre;
  form.referralReason = body.referralReason;
  form.notes = body.notes;

  return form;
}

export function mapUpdateToCOBBabyCare(
  form: RecordCOBBabyCare,
  body: COBBabyCareUpdate,
): RecordCOBBabyCare {
  // Updating fields if provided
  form.date = body.date;
  form.day = body.day;
  form.weightInKg = body.weightInKg;
  form.temperatureInCelsius = body.temperatureInCelsius;
  form.urineOutput = body.urineOutput;
  form.stoolPattern = body.stoolPattern;
  form.eyesCondition = body.eyesCondition;
  form.skinCondition = body.skinCondition;
  form.skinFoldCondition = body.skinFoldCondition;
  form.yellowEyes = body.yellowEyes;
  form.yellowSkin = body.yellowSkin;
  form.umbilicalCordBleed = body.umbilicalCordBleed;
  form.cleanThreadUsed = body.cleanThreadUsed;
  form.feedingCondition = body.feedingCondition;
  form.cryCondition = body.cryCondition;
  form.abdomenCondition = body.abdomenCondition;
  form.coldToTouch = body.coldToTouch;
  form.chestIndrawn = body.chestIndrawn;
  form.pusOnUmbilicus = body.pusOnUmbilicus;
  form.respiratoryRate = body.respiratoryRate;
  return form;
}
