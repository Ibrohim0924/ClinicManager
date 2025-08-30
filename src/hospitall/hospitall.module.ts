import { Module } from '@nestjs/common';
import { HospitallService } from './hospitall.service';
import { HospitallController } from './hospitall.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospitall } from './entities/hospitall.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hospitall]),  ],
  controllers: [HospitallController],
  providers: [HospitallService],
  exports: [HospitallService],
})
export class HospitallModule {}
