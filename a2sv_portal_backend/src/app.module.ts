import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLISODateTime, GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CaslModule } from './casl/casl.module'
import { ContestModule } from './contest/contest.module'
import { GroupsModule } from './group/groups.module'
import { ProblemModule } from './problem/problem.module'
import { RolesModule } from './roles/roles.module'
import { UserSeasonTopicProblemModule } from './user-season-topic-problem/user-season-topic-problem.module'
import { SeasonTopicProblemModule } from './season-topic-problem/season-topic-problem.module'
import { SeasonTopicModule } from './season-topic/season-topic.module'
import { SeasonModule } from './season/season.module'
import { TagModule } from './tag/tag.module'
import { TopicModule } from './topic/topic.module'
import { UserSeasonContestProblemModule } from './user-season-contest-problem/user-season-contest-problem.module'
import { UserSeasonContestModule } from './user-season-contest/user-season-contest.module'
import { UserProfileModule } from './user-profile/user-profile.module'
import { UserTopicModule } from './user-topic/user-topic.module'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
// import { DataAnalyticsModule } from './data-analytics/data-analytics.module'
import { ScheduleModule } from '@nestjs/schedule'
import { SeasonContestModule } from './season-contest/season-contest.module'
import { GroupSeasonTopicModule } from './group-season-topic/group-season-topic.module'
import { GroupSeasonContestModule } from './group-season-contest/group-season-contest.module'
import { GroupSeasonModule } from './group-season/group-season.module';

@Module({
  imports: [
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
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
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
    AuthModule,
    PrismaModule,
    CaslModule,
    GroupsModule,
    RolesModule,
    UserModule,
    SeasonModule,
    TagModule,
    ProblemModule,
    TopicModule,
    UserProfileModule,
    UserTopicModule,
    SeasonTopicModule,
    SeasonTopicProblemModule,
    UserSeasonTopicProblemModule,
    ContestModule,
    UserSeasonContestModule,
    UserSeasonContestProblemModule,
    PrismaModule,
    CaslModule,
    // DataAnalyticsModule,
    SeasonContestModule,
    GroupSeasonTopicModule,
    GroupSeasonContestModule,
    GroupSeasonModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {
}
