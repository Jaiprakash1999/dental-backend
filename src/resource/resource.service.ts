import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CcTable } from 'src/entities/static/cc_table.entity';
import { DiagTable } from 'src/entities/static/diag_table.entity';
import { MedicalHandouts } from 'src/entities/static/handouts.entity';
import { InvTable } from 'src/entities/static/inv_table.entity';
import { LifestyleTable } from 'src/entities/static/lifestyle_table.entity';
import { MedAdr } from 'src/entities/static/med_adr.entity';
import { MedContra } from 'src/entities/static/med_contra.entity';
import { MedTable } from 'src/entities/static/med_table.entity';
import { ILike, Like, MoreThan, Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(DiagTable, 'staticDB')
    private readonly diagTableRepository: Repository<DiagTable>,
    @InjectRepository(MedTable, 'staticDB')
    private readonly medTableRepository: Repository<MedTable>,
    @InjectRepository(InvTable, 'staticDB')
    private readonly invTableRepository: Repository<InvTable>,
    @InjectRepository(LifestyleTable, 'staticDB')
    private readonly lifestyleRepository: Repository<LifestyleTable>,
    @InjectRepository(MedContra, 'staticDB')
    private readonly medContraRepository: Repository<MedContra>,
    @InjectRepository(CcTable, 'staticDB')
    private readonly cheifComplaintRepository: Repository<CcTable>,
    @InjectRepository(MedAdr, 'staticDB')
    private readonly medAdrRepository: Repository<MedAdr>,
    @InjectRepository(MedicalHandouts, 'staticDB')
    private readonly handoutsRepository: Repository<MedicalHandouts>,
  ) {}
  async getAllDiagnosis() {
    try {
      const diagnosis = await this.diagTableRepository
        .createQueryBuilder('diag')
        .select('diag.name')
        .getMany();

      const diagnosisNames = diagnosis.map((diag) => diag.name);
      return { diagnoses: diagnosisNames };
    } catch (error) {
      console.log(`error in getAllDiagnosis ${error.message}`);
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  async getAllMedications() {
    try {
      const medications = await this.medTableRepository
        .createQueryBuilder('med')
        .select('med.name')
        .getMany();

      const medicationNames = medications.map((med) => med.name);
      return { medications: medicationNames };
    } catch (error) {
      console.log(`error in getAllMedications ${error.message}`);
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  async getAllSymptoms() {
    try {
      const cheifComplaints = await this.cheifComplaintRepository
        .createQueryBuilder('cc')
        .select('cc.name')
        .getMany();

      const cheifComplaintNames = cheifComplaints.map((cc) => cc.name);
      return { chiefComplaints: cheifComplaintNames };
    } catch (error) {
      console.log(`error in getAllCheifComplaints ${error.message}`);
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  async getAllLifestyles() {
    try {
      const lifestyles = await this.lifestyleRepository
        .createQueryBuilder('lifeStyle')
        .select('lifeStyle.name')
        .getMany();

      const lifestyleNames = lifestyles.map((lifestyle) => lifestyle.name);
      return { lifestyles: lifestyleNames };
    } catch (error) {
      console.log(`error in getAllLiifeStyle ${error.message}`);
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  async getAllInvestigations() {
    try {
      const investigations = await this.invTableRepository
        .createQueryBuilder('inv')
        .select('inv.name')
        .getMany();

      const investigationNames = investigations.map((med) => med.name);
      return { investigations: investigationNames };
    } catch (error) {
      console.log(`error in getAllInvestigations ${error.message}`);
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  async searchDiagnosis(query: string, chiefComplaint: string) {
    try {
      let diagnosisNames: string[] = [];

      // Step 1: Retrieve medications related to the given diagnosis with the query filter if provided
      if (chiefComplaint) {
        const diagnosisByChiefComplaint = await this.diagTableRepository.find({
          where: {
            ccDiagTable: {
              cc_name: {
                name: ILike(`%${chiefComplaint}%`),
              },
            },
            ...(query ? { name: ILike(`%${query}%`) } : {}), // Apply query filter if provided
          },
          relations: ['ccDiagTable', 'ccDiagTable.cc_name'],
          select: ['name'],
        });
        diagnosisNames = diagnosisByChiefComplaint.map((inv) => inv.name);
      }

      // Step 2: If fewer than 50 medications are found, retrieve additional medications from MedTable based on query
      if (diagnosisNames.length < 50) {
        const additionalDiagnosis = await this.diagTableRepository.find({
          where: query ? { name: ILike(`%${query}%`) } : {}, // Apply query filter if provided
          select: ['name'],
          take: 50 - diagnosisNames.length, // Fetch only enough to reach 50
        });
        const additionalDiagnosisNames = additionalDiagnosis.map(
          (med) => med.name,
        );
        diagnosisNames = Array.from(
          new Set([...diagnosisNames, ...additionalDiagnosisNames]),
        ); // Ensure no duplicates
      }

      if (query) {
        diagnosisNames = diagnosisNames.sort((a, b) => {
          if (a === query && b !== query) return -1; // Exact match first
          if (b === query && a !== query) return 1;
          if (a.startsWith(query) && !b.startsWith(query)) return -1; // Starts with query next
          if (b.startsWith(query) && !a.startsWith(query)) return 1;
          return a.indexOf(query) - b.indexOf(query); // Partial matches by position
        });
      }

      // Return up to 50 medication names
      return { diagnosis: diagnosisNames.slice(0, 50) };
    } catch (error) {
      console.error(
        `Error in searchDiagnosis: ${error.stack || error.message}`,
      );
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  async searchMedications(query: string, diagnosis: string) {
    try {
      let medicationNames: string[] = [];
      // Step 1: Retrieve medications related to the given diagnosis with the query filter if provided
      if (diagnosis) {
        const medicationsByDiagnosis = await this.medTableRepository.find({
          where: {
            diagMedTable: {
              diagnosis_name: {
                name: ILike(`%${diagnosis}%`),
              },
            },
            ...(query ? { name: Like(`%${query}%`) } : {}), // Apply query filter if provided
          },
          relations: ['diagMedTable', 'diagMedTable.diagnosis_name'],
          select: ['name'],
        });
        medicationNames = medicationsByDiagnosis.map((med) => med.name);
      }

      // Step 2: If fewer than 50 medications are found, retrieve additional medications from MedTable based on query
      if (medicationNames.length < 50) {
        const additionalMedications = await this.medTableRepository.find({
          where: query ? { name: ILike(`%${query}%`) } : {}, // Apply query filter if provided
          select: ['name'],
          take: 50 - medicationNames.length, // Fetch only enough to reach 50
        });
        const additionalMedicationNames = additionalMedications.map(
          (med) => med.name,
        );
        medicationNames = Array.from(
          new Set([...medicationNames, ...additionalMedicationNames]),
        ); // Ensure no duplicates
      }

      if (query) {
        medicationNames = medicationNames.sort((a, b) => {
          if (a === query && b !== query) return -1; // Exact match first
          if (b === query && a !== query) return 1;
          if (a.startsWith(query) && !b.startsWith(query)) return -1; // Starts with query next
          if (b.startsWith(query) && !a.startsWith(query)) return 1;
          return a.indexOf(query) - b.indexOf(query); // Partial matches by position
        });
      }
      const finalMedications = medicationNames.slice(0, 50);

      // Return up to 50 medication names
      return { medications: finalMedications };
    } catch (error) {
      console.error(
        `Error in searchMedications: ${error.stack || error.message}`,
      );
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  async searchSymptoms(query: string, diagnosis: string) {
    try {
      let chiefComplaintNames: string[] = [];

      // Step 1: Retrieve chief complaints based on diagnosis and query if provided
      if (diagnosis) {
        const chiefComplaintsByDiagnosis =
          await this.cheifComplaintRepository.find({
            where: {
              ccDiagTable: {
                diagnosis_name: {
                  name: ILike(`%${diagnosis}%`),
                },
              },
              ...(query ? { name: ILike(`%${query}%`) } : {}),
            },
            relations: ['ccDiagTable', 'ccDiagTable.diagnosis_name'],
            select: ['name'],
          });
        chiefComplaintNames = chiefComplaintsByDiagnosis.map((cc) => cc.name);
      }

      // Step 2: If fewer than 50 chief complaints found, retrieve additional from CcTable based on query
      if (chiefComplaintNames.length < 50) {
        const additionalChiefComplaints =
          await this.cheifComplaintRepository.find({
            where: query ? { name: ILike(`%${query}%`) } : {},
            select: ['name'],
            take: 50 - chiefComplaintNames.length,
          });
        const additionalChiefComplaintNames = additionalChiefComplaints.map(
          (cc) => cc.name,
        );
        chiefComplaintNames = Array.from(
          new Set([...chiefComplaintNames, ...additionalChiefComplaintNames]),
        );
      }

      // Step 3: Apply ranking based on query preference if query is provided
      if (query) {
        chiefComplaintNames = chiefComplaintNames.sort((a, b) => {
          if (a === query && b !== query) return -1; // Exact match first
          if (b === query && a !== query) return 1;
          if (a.startsWith(query) && !b.startsWith(query)) return -1; // Starts with query next
          if (b.startsWith(query) && !a.startsWith(query)) return 1;
          return a.indexOf(query) - b.indexOf(query); // Partial matches by position
        });
      }

      // Return up to 50 chief complaints in the preferred order
      return { chiefComplaints: chiefComplaintNames.slice(0, 50) };
    } catch (error) {
      console.error(
        `Error in searchChiefComplaint: ${error.stack || error.message}`,
      );
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  async searchLifestyle(query: string, diagnosis: string) {
    try {
      let lifeStyleNames: string[] = [];
      // Step 1: Retrieve medications related to the given diagnosis with the query filter if provided
      if (diagnosis) {
        const lifestyleByDiagnosis = await this.lifestyleRepository.find({
          where: {
            diagLifestyleTable: {
              diagnosis_name: {
                name: ILike(`%${diagnosis}%`),
              },
            },
            ...(query ? { name: ILike(`%${query}%`) } : {}), // Apply query filter if provided
          },
          relations: [
            'diagLifestyleTable',
            'diagLifestyleTable.diagnosis_name',
          ],
          select: ['name'],
        });
        lifeStyleNames = lifestyleByDiagnosis.map((med) => med.name);
      }

      // Step 2: If fewer than 50 medications are found, retrieve additional medications from MedTable based on query
      if (lifeStyleNames.length < 50) {
        const additionalLifestyles = await this.lifestyleRepository.find({
          where: query ? { name: ILike(`%${query}%`) } : {}, // Apply query filter if provided
          select: ['name'],
          take: 50 - lifeStyleNames.length, // Fetch only enough to reach 50
        });
        const additionalMedicationNames = additionalLifestyles.map(
          (med) => med.name,
        );
        lifeStyleNames = Array.from(
          new Set([...lifeStyleNames, ...additionalMedicationNames]),
        ); // Ensure no duplicates
      }

      if (query) {
        lifeStyleNames = lifeStyleNames.sort((a, b) => {
          if (a === query && b !== query) return -1; // Exact match first
          if (b === query && a !== query) return 1;
          if (a.startsWith(query) && !b.startsWith(query)) return -1; // Starts with query next
          if (b.startsWith(query) && !a.startsWith(query)) return 1;
          return a.indexOf(query) - b.indexOf(query); // Partial matches by position
        });
      }

      // Return up to 50 medication names
      return { lifestyles: lifeStyleNames.slice(0, 50) };
    } catch (error) {
      console.error(
        `Error in searchLifestyle: ${error.stack || error.message}`,
      );
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  async searchInvestigations(query: string, diagnosis: string) {
    try {
      let investigationNames: string[] = [];

      // Step 1: Retrieve medications related to the given diagnosis with the query filter if provided
      if (diagnosis) {
        const investigationsByDiagnosis = await this.invTableRepository.find({
          where: {
            diagInvTable: {
              diagnosis_name: {
                name: ILike(`%${diagnosis}%`),
              },
            },
            ...(query ? { name: ILike(`%${query}%`) } : {}), // Apply query filter if provided
          },
          relations: ['diagInvTable', 'diagInvTable.diagnosis_name'],
          select: ['name'],
        });
        investigationNames = investigationsByDiagnosis.map((inv) => inv.name);
      }

      // Step 2: If fewer than 50 medications are found, retrieve additional medications from MedTable based on query
      if (investigationNames.length < 50) {
        const additionalInvestigations = await this.invTableRepository.find({
          where: query ? { name: ILike(`%${query}%`) } : {}, // Apply query filter if provided
          select: ['name'],
          take: 50 - investigationNames.length, // Fetch only enough to reach 50
        });
        const additionalInvestigationNames = additionalInvestigations.map(
          (med) => med.name,
        );
        investigationNames = Array.from(
          new Set([...investigationNames, ...additionalInvestigationNames]),
        ); // Ensure no duplicates
      }

      if (query) {
        investigationNames = investigationNames.sort((a, b) => {
          if (a === query && b !== query) return -1; // Exact match first
          if (b === query && a !== query) return 1;
          if (a.startsWith(query) && !b.startsWith(query)) return -1; // Starts with query next
          if (b.startsWith(query) && !a.startsWith(query)) return 1;
          return a.indexOf(query) - b.indexOf(query); // Partial matches by position
        });
      }

      // Return up to 50 medication names
      return { investigations: investigationNames.slice(0, 50) };
    } catch (error) {
      console.error(
        `Error in searchInvestigations: ${error.stack || error.message}`,
      );
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  async getContraindications(medication?: string) {
    try {
      let contraindication: string[] = [];

      // Step 1: Retrieve medications related to the given diagnosis with the query filter if provided
      if (medication) {
        const medicationInRepo = await this.medTableRepository.findOne({
          where: {
            name: ILike(`%${medication}%`),
          },
        });
        if (!medicationInRepo) {
          return { contraindications: [] };
        }
        const contraIndicationOfMedication =
          await this.medContraRepository.find({
            where: {
              medication_name: medicationInRepo,
              score: MoreThan(0),
            },
            order: { score: 'DESC' },
            relations: ['medication_name', 'contraindication_name'],
            select: ['contraindication_name'],
          });
        contraindication = contraIndicationOfMedication.map(
          (contra) => contra.contraindication_name.name,
        );
      }

      // Return up to 50 medication names
      return { contraindications: contraindication };
    } catch (error) {
      console.error(
        `Error in searchMedications: ${error.stack || error.message}`,
      );
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  async getAdrs(medication: string) {
    try {
      let adr: string[] = [];

      // Step 1: Retrieve medications related to the given diagnosis with the query filter if provided
      if (medication) {
        const medicationInRepo = await this.medTableRepository.findOne({
          where: {
            name: ILike(`%${medication}%`),
          },
        });
        if (!medicationInRepo) {
          return { adrList: [] };
        }
        const contraIndicationOfMedication = await this.medAdrRepository.find({
          where: {
            medication_name: medicationInRepo,
            score: MoreThan(0),
          },
          order: { score: 'DESC' },
          relations: ['medication_name', 'adr_name'],
          select: ['adr_name'],
        });
        adr = contraIndicationOfMedication.map((adr) => adr.adr_name.name);
      }

      // Return up to 50 medication names
      return { adrList: adr };
    } catch (error) {
      console.error(
        `Error in searchMedications: ${error.stack || error.message}`,
      );
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  async getAllHandouts() {
    return await this.handoutsRepository.find();
  }

  async getHandoutsByTag(tag: string) {
    return await this.handoutsRepository.find({
      where: {
        tag: tag,
      },
    });
  }

  async getHandout(id: string) {
    // Retrieve handout from the database
    const handout = await this.handoutsRepository.findOne({
      where: {
        id,
      },
    });

    if (!handout) {
      throw new NotFoundException('Handout not found');
    }

    const documentKey = handout.document_key; // Example: "example.pdf"
    const filePath = path.join(__dirname, '../../../../handouts', documentKey);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }

    // Create a readable stream for the file
    const fileStream = fs.createReadStream(filePath);

    return fileStream;
  }

  async searchTags(query: string) {
    try {
      // First, get tags that start with the query
      const tagsStartingWithQuery = await this.handoutsRepository
        .createQueryBuilder('handout')
        .select('DISTINCT handout.tag', 'tag')
        .where('handout.tag ILIKE :searchTermStart', {
          searchTermStart: `${query}%`,
        })
        .getRawMany();

      // Next, get tags that contain the query but do not start with it
      const tagsContainingQuery = await this.handoutsRepository
        .createQueryBuilder('handout')
        .select('DISTINCT handout.tag', 'tag')
        .where('handout.tag ILIKE :searchTermContain', {
          searchTermContain: `%${query}%`,
        })
        .andWhere('handout.tag NOT ILIKE :searchTermStart', {
          searchTermStart: `${query}%`,
        })
        .getRawMany();

      // Merge both results: starting with the query first, then containing the query
      const distinctTags = [
        ...tagsStartingWithQuery.map((result) => result.tag),
        ...tagsContainingQuery.map((result) => result.tag),
      ];

      // Limit the result to 10 tags
      return distinctTags.slice(0, 10);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
