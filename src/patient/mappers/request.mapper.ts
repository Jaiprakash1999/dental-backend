import { Patient } from 'src/entities/dynamic/patient.entity';
import { User } from 'src/entities/dynamic/user.entity';
import { PatientCreate } from '../dtos/request/patient_create.request';
import { PatientUpdate } from '../dtos/request/patient_update.request';
import { customAlphabet } from 'nanoid';
import { MMUUnit } from 'src/utils/enums/mmu_unit.enum';
const nanoid = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 8);

export function mapToPatient(
  userId: number,
  body: PatientCreate,
  soundexValue: string,
  fatherSoundexValue: string,
  thumbnail: string,
): Patient {
  const response = new Patient();
  response.id =
    body.mmuUnit.toString()[0] +
    body.mmuUnit.toString()[1].toUpperCase() +
    nanoid();
  response.name = body.name;
  response.soundexValue = soundexValue;
  response.gender = body.gender;
  response.fatherSoundexValue = fatherSoundexValue;
  response.fatherName = body.fatherName;
  response.dateOfBirth = body.dateOfBirth;
  response.monthOfBirth = body.monthOfBirth;
  response.yearOfBirth = body.yearOfBirth;
  response.phoneNumber = body.phoneNumber;
  response.bloodGroup = body.bloodGroup;
  response.thumbnail = thumbnail;
  response.photo = body.photo;
  response.patientTag = body.patientTag;
  response.habitat = body.habitat;
  response.line = body.address;
  response.district = body.district;
  response.pincode = body.pincode;
  response.city = body.city;
  response.state = body.state;
  response.tehsil = body.tehsil;
  response.createdBy = userId;
  return response;
}

export function mapToUpdatePatient(
  userId: number,
  patient: Patient,
  fatherSoundexCode: string,
  body: PatientUpdate,
): Patient {
  patient.gender = body.gender ? body.gender : patient.gender;
  patient.fatherName = body.fatherName ? body.fatherName : patient.fatherName;
  patient.yearOfBirth = body.yearOfBirth
    ? body.yearOfBirth
    : patient.yearOfBirth;
  patient.dateOfBirth = body.dateOfBirth
    ? body.dateOfBirth
    : patient.dateOfBirth;
  patient.monthOfBirth = body.monthOfBirth
    ? body.monthOfBirth
    : patient.monthOfBirth;
  patient.fatherSoundexValue = fatherSoundexCode;
  patient.habitat = body.habitat ? body.habitat : patient.habitat;
  patient.patientTag = body.patientTag ? body.patientTag : patient.patientTag;
  patient.bloodGroup = body.bloodGroup ? body.bloodGroup : patient.bloodGroup;
  patient.state = body.state ? body.state : patient.state;
  patient.district = body.district ? body.district : patient.district;
  patient.pincode = body.pincode ? body.pincode : patient.pincode;
  patient.line = body.address ? body.address : patient.line;
  patient.city = body.city ? body.city : patient.city;
  patient.tehsil = body.tehsil ? body.tehsil : patient.tehsil;
  patient.updatedBy = userId;
  return patient;
}
