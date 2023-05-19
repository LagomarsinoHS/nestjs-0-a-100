import { Body, Controller, Logger, Param, Post } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { TaskDTO } from '../dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post(':projectId')
  async create(@Param('projectId') projectId: string, @Body() body: TaskDTO) {
    try {
      return this.taskService.create(projectId, body);
    } catch (error) {
      Logger.error(error);
    }
  }
}
