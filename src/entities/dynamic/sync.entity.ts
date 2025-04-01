import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Sync {
  @PrimaryColumn()
  id: string;

  // Dynamically generated columns for each mmuUnit and table
  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_broadcast: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_broadcast: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_broadcast: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_broadcast: string;

  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_chat: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_chat: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_chat: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_chat: string;

  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_patient: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_patient: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_patient: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_patient: string;

  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_record_anc_antenatal_visit: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_record_anc_antenatal_visit: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_record_anc_antenatal_visit: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_record_anc_antenatal_visit: string;

  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_record_anc_optional_investigation: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_record_anc_optional_investigation: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_record_anc_optional_investigation: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_record_anc_optional_investigation: string;

  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_record_antenatal_care: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_record_antenatal_care: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_record_antenatal_care: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_record_antenatal_care: string;

  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_record_pregnancy_overview: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_record_pregnancy_overview: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_record_pregnancy_overview: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_record_pregnancy_overview: string;

  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_record_care_of_baby: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_record_care_of_baby: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_record_care_of_baby: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_record_care_of_baby: string;

  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_record_cob_baby_care: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_record_cob_baby_care: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_record_cob_baby_care: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_record_cob_baby_care: string;

  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_record_pnc_postpartum_care: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_record_pnc_postpartum_care: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_record_pnc_postpartum_care: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_record_pnc_postpartum_care: string;

  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_record_post_natal_care: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_record_post_natal_care: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_record_post_natal_care: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_record_post_natal_care: string;

  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_record_prescription_rx: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_record_prescription_rx: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_record_prescription_rx: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_record_prescription_rx: string;

  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_record_prescription: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_record_prescription: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_record_prescription: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_record_prescription: string;

  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_record_screening_form: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_record_screening_form: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_record_screening_form: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_record_screening_form: string;

  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_record_sf_lab_investigations: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_record_sf_lab_investigations: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_record_sf_lab_investigations: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_record_sf_lab_investigations: string;

  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_record_vaccination_form: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_record_vaccination_form: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_record_vaccination_form: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_record_vaccination_form: string;

  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_record_vital_form: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_record_vital_form: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_record_vital_form: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_record_vital_form: string;

  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_template_rx: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_template_rx: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_template_rx: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_template_rx: string;

  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_template: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_template: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_template: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_template: string;

  @Column({ nullable: true, default: 'Not Synced' })
  pinapaka_visit: string;

  @Column({ nullable: true, default: 'Not Synced' })
  cherla_visit: string;

  @Column({ nullable: true, default: 'Not Synced' })
  burgampadu_visit: string;

  @Column({ nullable: true, default: 'Not Synced' })
  aid_visit: string;
}
