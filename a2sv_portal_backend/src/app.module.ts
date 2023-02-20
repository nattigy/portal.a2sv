import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLISODateTime, GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'
import { AuthModule } from './app/auth/auth.module'
import { CaslModule } from './casl/casl.module'
import { ProblemModule } from './app/problem/problem.module'
import { TagModule } from './app/tag/tag.module'
import { TopicModule } from './app/topic/topic.module'
import { UserProfileModule } from './app/user-profile/user-profile.module'
import { PrismaModule } from './prisma/prisma.module'
import { ScheduleModule } from '@nestjs/schedule'
import { MailModule } from './mail/mail.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { join } from 'path'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { StorageModule } from './storage/storage.module'
import {
  UsersUpdateTopicComfortabilityModule,
} from './services/users-update-topic-comfortability/users-update-topic-comfortability.module'
import {
  UsersUpdateProblemStatusModule,
} from './services/users-update-problem-status/users-update-problem-status.module'
import { StudentDataAnalyticsModule } from './app/user-group-season-analytics/student-data-analytics.module'
import { ManageGroupSeasonModule } from './services/manage-group-season/manage-group-season.module'
import { ManageUserGroupSeasonModule } from './services/manage-user-group-season/manage-user-group-season.module'
import { UserModule } from './app/user/user.module'
import { GroupModule } from './app/group/group.module'
import { SeasonModule } from './app/season/season.module'
import {
  ManageGroupSeasonContestModule
} from './services/manage-group-season-contest/manage-group-season-contest.module'
import {
  UserUpdateContestProblemModule
} from './services/user-update-contest-problem/user-update-contest-problem.module'
import { ContestModule } from './app/contest/contest.module'
import { SeasonTopicResourceModule } from './app/season-topic-resource/season-topic-resource.module'

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.socketlabs.com',
        secure: false,
        auth: {
          user: process.env.SOCKET_LABS_USER_NAME,
          pass: process.env.SOCKET_LABS_PASSWORD,
        },
      },
      template: {
        dir: join(__dirname, '../mail/template'),
        adapter: new HandlebarsAdapter(),
      },
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      cors: {
        origin: '*',
        credentials: true,
      },
      context: ({ req, res }) => ({
        req,
        res,
      }),
      driver: ApolloDriver,
      sortSchema: true,
      playground: false,

      debug: true,
      introspection: true,
      autoSchemaFile: true,

      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      resolvers: { DateTime: GraphQLISODateTime },
    }),
    MailModule,
    AuthModule,
    PrismaModule,
    CaslModule,
    TagModule,
    // ContestModule,
    SeasonTopicResourceModule,
    ProblemModule,
    TopicModule,
    UserModule,
    SeasonModule,
    GroupModule,
    UserProfileModule,
    PrismaModule,
    UsersUpdateProblemStatusModule,
    StorageModule,
    UsersUpdateTopicComfortabilityModule,
    StudentDataAnalyticsModule,
    ManageGroupSeasonModule,
    ManageUserGroupSeasonModule,
    // ManageGroupSeasonContestModule,
    // UserUpdateContestProblemModule,
    // ContestStatsModule,
    // ContestLeaderboardModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {
}
