import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/entities/dynamic/doctor.entity';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from './create-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor, 'dynamicDB')
    private doctorRepository: Repository<Doctor>,
  ) {}

  async createDoctor(data: CreateDoctorDto): Promise<Doctor> {
    const doctor = this.doctorRepository.create(data);
    return await this.doctorRepository.save(doctor);
  }

  async getAllDoctors(): Promise<Doctor[]> {
    return await this.doctorRepository.find();
  }

  async deleteDoctor(id: number): Promise<void> {
    await this.doctorRepository.delete(id);
  }
}
