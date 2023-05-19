import { TaskEntity } from '../../tasks/entities/task.entity';
import { BaseEntity } from '../../config/base.entity';
import { IProject } from '../../interfaces/project.interface';
import { UsersProjectsEntity } from '../../users/entities/usersProjects.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('projects')
export class ProjectsEntity extends BaseEntity implements IProject {
  @Column()
  name: string;
  @Column()
  description: string;

  @OneToMany(() => UsersProjectsEntity, (userProject) => userProject.project)
  usersIncludes: UsersProjectsEntity[];

  @OneToMany(() => TaskEntity, (task) => task.project)
  tasks: TaskEntity[];
}
