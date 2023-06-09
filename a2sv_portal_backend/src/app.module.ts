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
import { UsersUpdateTopicComfortabilityModule } from './services/users-update-topic-comfortability/users-update-topic-comfortability.module'
import { UsersUpdateProblemStatusModule } from './services/users-update-topic-problem-status/users-update-problem-status.module'
import { UserGroupSeasonDataAnalyticsModule } from './app/user-group-season-data-analytics/user-group-season-data-analytics.module'
import { ManageGroupSeasonsModule } from './services/manage-group-seasons/manage-group-seasons.module'
import { ManageUserGroupSeasonsModule } from './services/manage-user-group-seasons/manage-user-group-seasons.module'
import { UserModule } from './app/user/user.module'
import { GroupModule } from './app/group/group.module'
import { SeasonModule } from './app/season/season.module'
import { ContestModule } from './app/contest/contest.module'
import { ManageGroupsModule } from './services/manage-groups/manage-groups.module'
import { ManageSeasonsModule } from './services/manage-seasons/manage-seasons.module'
import { ManageSeasonTopicsModule } from './services/manage-season-topics/manage-season-topics.module'
import { SeasonTopicResourceModule } from './app/season-topic-resource/season-topic-resource.module'
import { ManageContestsModule } from './services/manage-contests/manage-contests.module'
import { ManageGroupSeasonContestModule } from './services/manage-group-season-contest/manage-group-season-contest.module'
import { UserUpdateContestProblemModule } from './services/user-update-contest-problem-status/user-update-contest-problem.module'

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
    ContestModule,
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
    ManageGroupsModule,
    ManageSeasonsModule,
    ManageSeasonTopicsModule,
    UsersUpdateTopicComfortabilityModule,
    UserGroupSeasonDataAnalyticsModule,
    ManageGroupSeasonsModule,
    ManageUserGroupSeasonsModule,
    ManageContestsModule,
    ManageGroupSeasonContestModule,
    UserUpdateContestProblemModule,
    // ContestStatsModule,
    // ContestLeaderboardModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
