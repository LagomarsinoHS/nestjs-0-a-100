import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDTO } from '../dto/project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findProjects() {
    try {
      return this.projectsService.find();
    } catch (error) {
      Logger.error(error);
    }
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    try {
      return this.projectsService.findById(id);
    } catch (error) {
      Logger.error(error);
    }
  }

  @Post()
  createProject(@Body() project: ProjectDTO) {
    try {
      return this.projectsService.create(project);
    } catch (error) {
      Logger.error(error);
    }
  }

  @Put(':id')
  updateProject(@Param('id') id: string, @Body() user: Partial<ProjectDTO>) {
    try {
      return this.projectsService.update(id, user);
    } catch (error) {
      Logger.error(error);
    }
  }
}
