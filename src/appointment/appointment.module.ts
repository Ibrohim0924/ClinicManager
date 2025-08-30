import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { PatientModule } from 'src/patient/patient.module';
import { DoctorModule } from 'src/doctor/doctor.module';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), PatientModule, DoctorModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentService]
})
export class AppointmentModule {}
