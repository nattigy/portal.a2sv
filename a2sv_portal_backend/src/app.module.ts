import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import databaseconfig from './config/databaseconfig';
import { GroupController } from './group/group.controller';
import { GroupService } from './group/group.service';
import { GroupModule } from './group/group.module';
import { TopicModule } from './topic/topic.module';
import { ProblemStatusModule } from './problem_status/problem_status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseconfig],
      isGlobal: true,
      envFilePath: '../.env',
    }),
    GroupModule,
    AuthModule,
    UsersModule,
    PrismaModule,
    TopicModule,
    ProblemStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
