import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users.entity';
import { QueryBuilder, Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepo: Repository<UsersEntity>,
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
        .getOne();
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  public async create(user: UserDto): Promise<UsersEntity> {
    try {
      return this.userRepo.save(user);
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateById(
    id: string,
    user: Partial<UserDto>,
  ): Promise<UserDto> {
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
