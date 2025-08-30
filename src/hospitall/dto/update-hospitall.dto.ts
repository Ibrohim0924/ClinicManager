import { PartialType } from '@nestjs/mapped-types';
import { CreateHospitallDto } from './create-hospitall.dto';

export class UpdateHospitallDto extends PartialType(CreateHospitallDto) {}
