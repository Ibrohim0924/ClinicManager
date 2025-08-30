import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { PatientService } from 'src/patient/patient.service';
import { DoctorService } from 'src/doctor/doctor.service';

@Injectable()
export class AppointmentService {
  constructor(@InjectRepository(Appointment)
  private appoitmentRepo: Repository<Appointment>,
    private patientService: PatientService,
    private doctorService: DoctorService
  ) { }
  async create(createAppointmentDto: CreateAppointmentDto) {
    const patient = await this.patientService.findOne(createAppointmentDto.patientId)
    if (!patient) {
      throw new NotFoundException('Patient not found')
    }
    const doctor = await this.doctorService.findOne(createAppointmentDto.doctorId)
    if (!doctor) {
      throw new NotFoundException('Doctor not found')
    }
    const appointment = await this.appoitmentRepo.save(createAppointmentDto)
    return appointment
  }

  async findAll() {
    const appointment = await this.appoitmentRepo.find(
      { relations: { doctor: true, patient: true } }
    )
    return appointment
  }

  async findOne(id: number) {
    const appointment = await this.appoitmentRepo.findOne({ where: { id }, relations: { doctor: true , patient: true} })
    if (!appointment) {
      throw new NotFoundException('This Appointment not found')
    }
    return appointment
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    if (updateAppointmentDto.doctorId) {
      const checkDoctor = await this.doctorService.findOne(
        updateAppointmentDto.doctorId,
      );
      if (!checkDoctor) {
        throw new NotFoundException(`Doctor not found by ID ${id}`);
      }
      if (updateAppointmentDto.patientId) {
        const patientCheck = await this.patientService.findOne(
          updateAppointmentDto.patientId,
        );
        if (!patientCheck) {
          throw new NotFoundException(`Patient not found by ID ${id}`);
        }
      }
      const updateAppointment = await this.appoitmentRepo.update(id, updateAppointmentDto)
      return ({ message: 'Appoitment updated successfully', updateAppointment })
    }

  }

  async remove(id: number) {
    const appointment = await this.appoitmentRepo.findOne({ where: { id } })
    if (!appointment) {
      throw new NotFoundException('This Appointment not found')
    }
    await this.appoitmentRepo.delete(id)
    return ('Appoitment deleted successfully')
  }
}
