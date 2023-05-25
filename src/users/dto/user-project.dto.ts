import { IsNotEmpty, IsUUID, IsEnum } from 'class-validator';

import { UsersEntity } from '../entities/users.entity';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';
import { ACCESSLEVEL } from 'src/constants';
import { ApiProperty } from '@nestjs/swagger';

export class UserProjectDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  user: UsersEntity;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  project: ProjectsEntity;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ACCESSLEVEL)
  accessLevel: ACCESSLEVEL;
}
