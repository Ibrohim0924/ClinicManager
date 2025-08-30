import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitallModule } from './hospitall/hospitall.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://postgres:ibrohimjon0924@localhost:5432/hospital',
      synchronize: true,
      autoLoadEntities: true,
    }),
    HospitallModule,
    DoctorModule,
    PatientModule,
    AppointmentModule,
  ],
})
export class AppModule {}
