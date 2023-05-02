import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATA_SOURCE_CONFIG } from './config/data.source';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot(DATA_SOURCE_CONFIG),
    UsersModule,
    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
