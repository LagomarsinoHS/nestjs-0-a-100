import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controller/tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { ProjectsEntity } from '../projects/entities/projects.entity';
import { ProjectsService } from '../projects/services/projects.service';
import { HttpCustomService } from 'src/providers/http/http.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, ProjectsEntity]), HttpModule],
  providers: [TasksService, ProjectsService, HttpCustomService],
  controllers: [TasksController],
})
export class TasksModule {}
