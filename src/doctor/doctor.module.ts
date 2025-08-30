import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { HospitallModule } from 'src/hospitall/hospitall.module';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor]),
    HospitallModule
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService]
})
export class DoctorModule { }
