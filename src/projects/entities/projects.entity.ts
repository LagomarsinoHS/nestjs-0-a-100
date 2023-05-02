import { BaseEntity } from 'src/config/base.entity';
import { IProject } from 'src/interfaces/project.interface';
import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('projects')
export class ProjectsEntity extends BaseEntity implements IProject {
  @Column()
  name: string;
  @Column()
  description: string;

  @OneToMany(() => UsersProjectsEntity, (userProject) => userProject.project)
  usersIncludes: UsersProjectsEntity[];
}
