import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsEntity } from '../entities/projects.entity';
import { Repository } from 'typeorm';
import { ProjectDTO } from '../dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectRepo: Repository<ProjectsEntity>,
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
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async create(project: ProjectDTO): Promise<ProjectDTO> {
    try {
      return this.projectRepo.save(project);
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
