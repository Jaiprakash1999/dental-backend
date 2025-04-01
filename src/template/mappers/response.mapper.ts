import { TemplateRx } from 'src/entities/dynamic/template_rx.entity';
import { Template } from 'src/entities/dynamic/template.entity';
import { TemplateResponse } from '../dto/template.response';

export function mapToTemplateResponse(
  template: Template,
  rxList: TemplateRx[],
): TemplateResponse {
  const response = new TemplateResponse();
  response.id = template.id;
  response.chiefComplaint = template.chiefComplaint;
  response.followUp = template.followUp;
  response.lifeStyleRecommendations = template.lifeStyleRecommendations;
  response.instructions = template.instructions;
  response.diagnosis = template.diagnosis;
  response.rxList = rxList.map((rx) => ({
    drugName: rx.drugName,
    dose: rx.dose,
    measurement: rx.measurement,
    timing: rx.timing,
    duration: rx.duration,
    frequency: rx.frequency,
    notes: rx.notes,
  }));
  response.labInvestigations = template.labInvestigations;
  response.templateName = template.templateName;
  response.createdAt = template.createdAt.toISOString();
  return response;
}
