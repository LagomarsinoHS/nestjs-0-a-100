import { STATUS_TASK } from '../../constants/statuses';
import { ProjectDTO } from '../../projects/dto/project.dto';
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

export class TaskDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(STATUS_TASK)
  status: STATUS_TASK;

  @IsNotEmpty()
  @IsString()
  responsable: string;

  @IsOptional()
  project: ProjectDTO;
}
