import { VisitCreate } from '../dtos/request/visit_create.request';
import { Visit } from 'src/entities/dynamic/visit.entity';

export function mapToVisit(
  userId: number,
  headId: number,
  tokenNumber: number,
  body: VisitCreate,
): Visit {
  const response = new Visit();
  response.patientId = body.patientId;
  response.doctorId = body.doctorId;
  response.chiefComplaint = body.chiefComplaint;
  response.visitType = body.visitType;
  response.visitDate = body.visitDate;
  response.tags = body.tags;
  response.tokenNumber = tokenNumber;
  response.mmuUnit = body.mmuUnit;
  response.latitude = body.latitude;
  response.longitude = body.longitude;
  response.mmuHead = headId;
  response.district = body.district;
  response.pincode = body.pincode;
  response.city = body.city;
  response.state = body.state;
  response.tehsil = body.tehsil;
  response.createdBy = userId;
  response.line = body.line;
  return response;
}
