import { BaseEntity } from 'src/config/base.entity';
import { ROLES } from 'src/constants/index';

import { IUser } from 'src/interfaces/user.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { UsersProjectsEntity } from './usersProjects.entity';

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
  password: string;
  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  @OneToMany(() => UsersProjectsEntity, (usersProjects) => usersProjects.user)
  projectsIncludes: UsersProjectsEntity[];
}
