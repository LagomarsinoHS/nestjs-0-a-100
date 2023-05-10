import { BaseEntity } from '../../config/base.entity';
import { ROLES } from '../../constants/index';
import { IUser } from '../../interfaces/user.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { UsersProjectsEntity } from './usersProjects.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UsersEntity extends BaseEntity implements IUser {
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  age: number;
  @Column()
  email: string;
  @Column()
  username: string;
  @Column()
  @Exclude()
  password: string;
  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  @OneToMany(() => UsersProjectsEntity, (usersProjects) => usersProjects.user)
  projectsIncludes: UsersProjectsEntity[];
}
