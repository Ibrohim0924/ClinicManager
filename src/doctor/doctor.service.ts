import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { HospitallService } from '../hospitall/hospitall.service';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
    private hospitalService: HospitallService,
  ) { }
  async create(createDoctorDto: CreateDoctorDto) {
    const hospital = await this.hospitalService.findOne(createDoctorDto.hospitalId);
    if (!hospital) {
      throw new NotFoundException(`Hospital not found by ID ${createDoctorDto.hospitalId}`);
    }
    const newDoctor = await this.doctorRepo.save(createDoctorDto);
    return newDoctor;
  }

  async findAll() {
    const doctor = await this.doctorRepo.find(
      { relations: { hospital: true } }
    );
    return doctor;
  }

  async findOne(id: number) {
    const doctor = await this.doctorRepo.findOne({
      where: { id },
      relations: { hospital: true }
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor not found by ID ${id}`);
    }
    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    if (updateDoctorDto.hospitalId) {
      const checkHospital = await this.hospitalService.findOne(
        updateDoctorDto.hospitalId,
      );
      if (!checkHospital) {
        throw new NotFoundException(`Hospital not found by ID ${id}`);
      }
      const doctor = await this.doctorRepo.update(id, updateDoctorDto);
      return ({ message: 'Doctor updated succesfully', doctor });
    }
  }

  async remove(id: number) {
    const doctor = await this.doctorRepo.findOne({ where: { id } });
    if (!doctor) {
      throw new NotFoundException(`Doctor not found by ID ${id}`);
    }
    await this.doctorRepo.delete(id);
    return {};
  }
}
