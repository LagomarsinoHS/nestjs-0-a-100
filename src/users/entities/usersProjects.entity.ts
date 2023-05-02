import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';
import { ACCESSLEVEL } from 'src/constants/index';
import { UsersEntity } from './users.entity';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';

@Entity('users_projects')
export class UsersProjectsEntity extends BaseEntity {
  @Column({ type: 'enum', enum: ACCESSLEVEL })
  accessLevel: ACCESSLEVEL;

  @ManyToOne(() => UsersEntity, (user) => user.projectsIncludes)
  user: UsersEntity;

  @ManyToOne(() => ProjectsEntity, (project) => project.usersIncludes)
  project: ProjectsEntity;
}
