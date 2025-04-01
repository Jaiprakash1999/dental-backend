import { Visit } from 'src/entities/dynamic/visit.entity';
import { VisitResponse } from '../dtos/response/visit.response';
import { Patient } from 'src/entities/dynamic/patient.entity';

export function visitResponseMapper(
  visit: Visit,
  patient: Patient,
  users: object[],
): VisitResponse {
  const response = new VisitResponse();
  response.id = visit.id;
  response.name = patient.name;
  response.patientId = visit.patientId;
  response.age = new Date().getFullYear() - patient.yearOfBirth;
  response.gender = patient.gender;
  response.doctorId = visit.doctorId;
  response.chiefComplaint = visit.chiefComplaint;
  response.visitType = visit.visitType;
  response.visitDate = visit.visitDate.toString();
  response.tags = visit.tags;
  response.tokenNumber = visit.tokenNumber;
  response.mmuUnit = visit.mmuUnit;
  response.visitStatus = visit.visitStatus;
  response.createdAt = visit.createdAt;
  response.updateAt = visit.updatedAt;
  response.latitude = visit.latitude;
  response.longitude = visit.longitude;
  response.mmuHead = visit.mmuHead;
  response.thumbnail = patient.thumbnail;
  response.state = visit.state;
  response.city = visit.city;
  response.pincode = visit.pincode;
  response.tehsil = visit.tehsil;
  response.district = visit.district;
  response.bloodGroup = patient.bloodGroup;
  response.createdBy = users.find((user) => user['id'] == visit.createdBy)[
    'name'
  ];
  response.address = visit.line;
  response.phoneNumber = patient.phoneNumber;
  return response;
}
