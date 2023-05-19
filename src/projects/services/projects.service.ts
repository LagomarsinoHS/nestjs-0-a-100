import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsEntity } from '../entities/projects.entity';
import { Repository } from 'typeorm';
import { ProjectDTO } from '../dto/project.dto';
import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entity';
import { UsersService } from 'src/users/services/users.service';
import { ACCESSLEVEL } from 'src/constants';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectRepo: Repository<ProjectsEntity>,
    @InjectRepository(UsersProjectsEntity)
    private readonly userProjectRepo: Repository<UsersProjectsEntity>,
    private readonly userService: UsersService,
  ) {}

  public async find(): Promise<ProjectsEntity[]> {
    try {
      return this.projectRepo.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findById(id: string): Promise<ProjectsEntity> {
    try {
      return await this.projectRepo
        .createQueryBuilder('project')
        .where({ id })
        .leftJoinAndSelect('project.usersIncludes', 'pu')
        .leftJoinAndSelect('pu.user', 'user')
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async create(
    userId: string,
    project: ProjectDTO,
  ): Promise<UsersProjectsEntity> {
    try {
      const user = await this.userService.findById(userId);
      const newProject = await this.projectRepo.save(project);

      return await this.userProjectRepo.save({
        accessLevel: ACCESSLEVEL.OWNER,
        user: user,
        project: newProject,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  public async update(id: string, body: Partial<ProjectDTO>): Promise<void> {
    try {
      const updatedProject = await this.projectRepo.update(id, body);
      if (updatedProject.affected === 0) {
        throw 'No Project was updated.';
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const deletedProject = await this.projectRepo.delete(id);
      if (deletedProject.affected === 0) {
        throw 'No Project was deleted.';
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
