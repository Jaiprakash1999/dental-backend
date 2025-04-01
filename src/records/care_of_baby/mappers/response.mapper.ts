import { RecordCareOfBaby } from 'src/entities/dynamic/records_care_of_baby.entity';
import { RecordCOBBabyCare } from 'src/entities/dynamic/records_cob_baby_care.entity';
import { CareOfBabyResponse } from '../dtos/response/care_of_baby.response';
import { CareOfBabyMetaResponse } from '../dtos/response/care_of_baby_meta.response';

export function mapToCareOfBabyResponse(
  form: RecordCareOfBaby,
  babyCares: RecordCOBBabyCare[],
): CareOfBabyResponse {
  const response = new CareOfBabyResponse();

  // Mapping properties from RecordCareOfBaby to CareOfBabyResponse
  response.id = form.id;
  response.firstExaminationDateTime = form.firstExaminationDateTime;
  response.firstFeedAfterBirth = form.firstFeedAfterBirth;
  response.firstBreastfeedTime = form.firstBreastfeedTime;
  response.howFeed = form.howFeed;
  response.weakSuckReason = form.weakSuckReason;
  response.dryBaby = form.dryBaby;
  response.keptWarm = form.keptWarm;
  response.dontBath = form.dontBath;
  response.wrappedCloseToMother = form.wrappedCloseToMother;
  response.exclusivelyBreastfed = form.exclusivelyBreastfed;
  response.cordCare = form.cordCare;
  response.notes = form.notes;
  response.unusualFindings = form.unusualFindings;
  (response.referredToHigherCentre = form.referredToHigherCentre),
    (response.referralReason = form.referralReason),
    // Mapping nested baby care records
    (response.babyCares = babyCares.map((care) => ({
      id: care.id,
      day: care.day,
      date: care.date,
      weightInKg: care.weightInKg ? Number(care.weightInKg) : null,
      temperatureInCelsius: care.temperatureInCelsius
        ? Number(care.temperatureInCelsius)
        : null,
      urineOutput: care.urineOutput,
      stoolPattern: care.stoolPattern,
      eyesCondition: care.eyesCondition,
      skinCondition: care.skinCondition,
      skinFoldCondition: care.skinFoldCondition,
      yellowEyes: care.yellowEyes,
      yellowSkin: care.yellowSkin,
      umbilicalCordBleed: care.umbilicalCordBleed,
      cleanThreadUsed: care.cleanThreadUsed,
      feedingCondition: care.feedingCondition,
      cryCondition: care.cryCondition,
      abdomenCondition: care.abdomenCondition,
      coldToTouch: care.coldToTouch,
      chestIndrawn: care.chestIndrawn,
      pusOnUmbilicus: care.pusOnUmbilicus,
      respiratoryRate: care.respiratoryRate,
    })));

  return response;
}

export function mapToCareOfBabyMetaResponse(
  users: object[],
  form: RecordCareOfBaby,
): CareOfBabyMetaResponse {
  const response = new CareOfBabyMetaResponse();
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
