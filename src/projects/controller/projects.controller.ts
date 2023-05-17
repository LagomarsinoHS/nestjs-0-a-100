import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDTO } from '../dto/project.dto';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { ACCESSLEVEL } from 'src/constants';

@Controller('projects')
@UseGuards(AccessLevelGuard)
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
  @AccessLevel(ACCESSLEVEL.OWNER)
  updateProject(@Param('id') id: string, @Body() user: Partial<ProjectDTO>) {
    try {
      return this.projectsService.update(id, user);
    } catch (error) {
      Logger.error(error);
    }
  }
}
