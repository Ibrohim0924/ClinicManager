import { DoctorRole } from '../enum/doctor-role.enum';

export class CreateDoctorDto {
  name: string;

  role: DoctorRole;

  hospitalId: number;
}
