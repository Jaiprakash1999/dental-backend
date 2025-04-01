import { Template } from 'src/entities/dynamic/template.entity';
import { TemplateCreate } from '../dto/template_create.request';
import { TemplateRxCreate } from '../dto/template_rx_create.request';
import { TemplateRx } from 'src/entities/dynamic/template_rx.entity';

export function rxEntityMapper(templateId: string, body: TemplateRxCreate) {
  const rx = new TemplateRx();
  rx.drugName = body.drugName;
  rx.dose = body.dose;
  rx.measurement = body.measurement;
  rx.timing = body.timing;
  rx.duration = body.duration;
  rx.frequency = body.frequency;
  rx.notes = body.notes;
  rx.templateId = templateId;
  return rx;
}
export function templateEntityMapper(
  creatorId:number,
  body: TemplateCreate,
): Template {
  const template = new Template();
  template.chiefComplaint = body.chiefComplaint;
  template.followUp = body.followUp;
  template.lifeStyleRecommendations = body.lifeStyleRecommendations;
  template.instructions = body.instructions;
  template.diagnosis = body.diagnosis;
  template.labInvestigations = body.labInvestigations;
  template.templateName = body.templateName;
  template.createdBy = creatorId;
  return template;
}
