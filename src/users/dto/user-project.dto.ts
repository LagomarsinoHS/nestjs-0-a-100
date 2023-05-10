import { IsNotEmpty, IsUUID, IsEnum } from 'class-validator';

import { UsersEntity } from '../entities/users.entity';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';
import { ACCESSLEVEL } from 'src/constants';

export class UserProjectDTO {
  @IsNotEmpty()
  @IsUUID()
  user: UsersEntity;

  @IsNotEmpty()
  @IsUUID()
  project: ProjectsEntity;

  @IsNotEmpty()
  @IsEnum(ACCESSLEVEL)
  accessLevel: ACCESSLEVEL;
}
