import { ApiProperty } from '@nestjs/swagger';
import { STATUS_TASK } from '../../constants/statuses';
import { ProjectDTO } from '../../projects/dto/project.dto';
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

export class TaskDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(STATUS_TASK)
  status: STATUS_TASK;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  responsable: string;

  @IsOptional()
  project: ProjectDTO;
}
