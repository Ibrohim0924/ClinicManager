import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(@InjectRepository(Patient) private patientRepo: Repository<Patient>) { }
  async create(createPatientDto: CreatePatientDto) {
    const { username } = createPatientDto
    const existsUsername = await this.patientRepo.findOneBy({ username })
    if (existsUsername) {
      throw new ConflictException(`Username ${username} already exists`)
    }
    const newPatient = await this.patientRepo.save(createPatientDto)
    return newPatient
  }

  async findAll() {
    const patient = await this.patientRepo.find()
    return patient
  }

  async findOne(id: number) {
    const patient = await this.patientRepo.findOne({
      where: { id }
    })
    if(!patient){
      throw new NotFoundException(`Patient not found by ID ${id}`)
    }
    return patient
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.patientRepo.findOneBy({ id });
    if (!patient) {
      throw new NotFoundException(`Patient not found by ID ${id}`);
    }
    const updatePatient = await this.patientRepo.update(
      id,
      updatePatientDto,
    );
    return ({ message: 'Patient updated succesfully', updatePatient});
  }

  async remove(id: number) {
    const patient = await this.patientRepo.findOneBy({ id });
    if (!patient) {
      throw new NotFoundException(`Patient not found by ID ${id}`);
    }
    await this.patientRepo.delete(id)
    return ('Patient deleted successfully')
  }
}
