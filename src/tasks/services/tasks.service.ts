import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { ProjectsService } from '../../projects/services/projects.service';
import { TaskDTO } from '../dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepo: Repository<TaskEntity>,
    private readonly projectService: ProjectsService,
  ) {}

  async create(projectId: string, body: TaskDTO): Promise<TaskEntity> {
    try {
      const project = await this.projectService.findById(projectId);
      if (!project) throw Error('Not Project Found');
      return await this.taskRepo.save({ ...body, project });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
