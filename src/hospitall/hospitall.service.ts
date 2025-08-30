import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHospitallDto } from './dto/create-hospitall.dto';
import { UpdateHospitallDto } from './dto/update-hospitall.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hospitall } from './entities/hospitall.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HospitallService {
  constructor(
    @InjectRepository(Hospitall) private hospitalRepo: Repository<Hospitall>,
  ) { }
  async create(createHospitallDto: CreateHospitallDto) {
    const { name } = createHospitallDto;
    const existName = await this.hospitalRepo.findOneBy({ name });
    if (existName) {
      throw new ConflictException(`Hospital with name ${name} already exists`);
    }
    const newHospital = await this.hospitalRepo.save(createHospitallDto);
    return newHospital;
  }

  async findAll() {
    const hospital = await this.hospitalRepo.find({
      relations: { doctors: true }
    });
    return hospital;
  }

  async findOne(id: number) {
    const hospital = await this.hospitalRepo.findOne({
      where: { id },
      relations: { doctors: true },
    });

    if (!hospital) {
      throw new NotFoundException(`Hospital not found by ID ${id}`);
    }
    return hospital;
  }


  async update(id: number, updateHospitallDto: UpdateHospitallDto) {
    const hospital = await this.hospitalRepo.findOneBy({ id });
    if (!hospital) {
      throw new NotFoundException(`Hospital not found by ID ${id}`);
    }
    const updateHospital = await this.hospitalRepo.update(
      id,
      updateHospitallDto,
    );
    return ({ message: 'Doctor updated succesfully', updateHospital});
  }

  async remove(id: number) {
    const hospital = await this.hospitalRepo.findOneBy({ id });
    if (!hospital) {
      throw new NotFoundException(`Hospital not found by ID ${id}`);
    }
    await this.hospitalRepo.delete(id);
    return `Hospital deleted successfully`;
  }
}
