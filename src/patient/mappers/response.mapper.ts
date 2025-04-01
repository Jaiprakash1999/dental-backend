import { Patient } from 'src/entities/dynamic/patient.entity';
import { PatientResponse } from '../dtos/response/patient.response';
import { PatientMetaResponse } from '../dtos/response/patient_meta.response';
import { getHabitat } from 'src/mandal/data/mappings';

export function mapToPatientResponse(
  patient: Patient,
  users: object[],
): PatientResponse {
  const response = new PatientResponse();
  response.id = patient.id;
  response.name = patient.name;
  response.gender = patient.gender;
  response.dateOfBirth = patient.dateOfBirth;
  response.monthOfBirth = patient.monthOfBirth;
  response.fatherName = patient.fatherName;
  response.yearOfBirth = patient.yearOfBirth;
  response.phoneNumber = patient.phoneNumber;
  response.bloodGroup = patient.bloodGroup;
  response.thumbnail = patient.thumbnail;
  response.photo = patient.photo;
  response.address = patient.line;
  response.district = patient.district;
  response.pincode = patient.pincode;
  response.city = patient.city;
  response.state = patient.state;
  response.tehsil = patient.tehsil;
  response.createdAt = patient.createdAt.toISOString();
  response.updatedAt = patient.updatedAt.toISOString();
  response.createdBy = users.find((user) => user['id'] == patient.createdBy)[
    'name'
  ];
  response.habitat = getHabitat(patient.habitat);
  response.patientTag = patient.patientTag;
  return response;
}
export function patientMetaResponseMapper(
  patient: Patient,
): PatientMetaResponse {
  const response = new PatientMetaResponse();
  response.id = patient.id;
  response.name = patient.name;
  response.fatherName = patient.fatherName;
  response.gender = patient.gender;
  response.age = new Date().getFullYear() - patient.yearOfBirth;
  response.bloodGroup = patient.bloodGroup;
  response.thumbnail = patient.thumbnail;
  response.address = patient.line;
  response.district = patient.district;
  response.dob = `${patient.dateOfBirth}/${patient.monthOfBirth}/${patient.yearOfBirth}`;
  response.city = patient.city;
  response.state = patient.state;
  response.tehsil = patient.tehsil;
  response.patientTag = patient.patientTag;
  response.habitat = getHabitat(patient.habitat);
  return response;
}
