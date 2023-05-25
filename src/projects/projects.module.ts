import { Module } from '@nestjs/common';
import { ProjectsController } from './controller/projects.controller';
import { ProjectsService } from './services/projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { UsersService } from 'src/users/services/users.service';
import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entity';
import { UsersEntity } from 'src/users/entities/users.entity';
import { HttpCustomService } from 'src/providers/http/http.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectsEntity,
      UsersProjectsEntity,
      UsersEntity,
    ]),
    HttpModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, UsersService, HttpCustomService],
})
export class ProjectsModule {}
