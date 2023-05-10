import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../dto/user.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UserProjectDTO } from '../dto/user-project.dto';
import { UsersProjectsEntity } from '../entities/usersProjects.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepo: Repository<UsersEntity>,
    @InjectRepository(UsersProjectsEntity)
    private readonly userProjectRepo: Repository<UsersProjectsEntity>,
  ) {}

  public async find(): Promise<UsersEntity[]> {
    try {
      return this.userRepo.find();
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  public async findById(id: string): Promise<UsersEntity> {
    try {
      return await this.userRepo
        .createQueryBuilder('user')
        .where({ id })
        .leftJoinAndSelect('user.projectsIncludes', 'up')
        .leftJoinAndSelect('up.project', 'upp')
        .getOne();
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  public async findBy({ key, value }: { key: keyof UserDTO; value: any }) {
    try {
      return await this.userRepo
        .createQueryBuilder('user')
        .where({ [key]: value })
        .leftJoinAndSelect('user.projectsIncludes', 'up')
        .leftJoinAndSelect('up.project', 'upp')
        .getOne();
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  public async create(user: UserDTO): Promise<UsersEntity> {
    try {
      const { password } = user;
      const newPassword = await bcrypt.hash(password, +process.env.HASH_SALT);

      user.password = newPassword;
      return this.userRepo.save(user);
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  public async createUP(
    userProject: UserProjectDTO,
  ): Promise<UsersProjectsEntity> {
    try {
      return this.userProjectRepo.save(userProject);
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateById(
    id: string,
    user: Partial<UserDTO>,
  ): Promise<UserDTO> {
    try {
      return (
        await this.userRepo
          .createQueryBuilder('user')
          .update()
          .set({ ...user })
          .where('id = :id ', { id })
          .returning('*')
          .execute()
      ).raw[0];
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteById(id: string): Promise<void> {
    try {
      const deletedUser = await this.userRepo.delete(id);
      if (deletedUser.affected === 0) {
        throw new ErrorManager({
          code: 'BAD_REQUEST',
          message: 'No user was deleted.',
        });
      }
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }
}
