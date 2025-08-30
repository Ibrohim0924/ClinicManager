import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HospitallService } from './hospitall.service';
import { CreateHospitallDto } from './dto/create-hospitall.dto';
import { UpdateHospitallDto } from './dto/update-hospitall.dto';

@Controller('hospital')
export class HospitallController {
  constructor(private readonly hospitallService: HospitallService) {}

  @Post()
  create(@Body() createHospitallDto: CreateHospitallDto) {
    return this.hospitallService.create(createHospitallDto);
  }

  @Get()
  findAll() {
    return this.hospitallService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitallService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHospitallDto: UpdateHospitallDto,
  ) {
    return this.hospitallService.update(+id, updateHospitallDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitallService.remove(+id);
  }
}
