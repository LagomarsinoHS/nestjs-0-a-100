import { STATUS_TASK } from '../../constants/statuses';
import { BaseEntity } from '../../config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProjectsEntity } from '../../projects/entities/projects.entity';

@Entity('task')
export class TaskEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: STATUS_TASK;

  @Column()
  responsable: string;

  @ManyToOne(() => ProjectsEntity, (pro) => pro.tasks)
  @JoinColumn({ name: 'project_id' })
  project: ProjectsEntity;
}
