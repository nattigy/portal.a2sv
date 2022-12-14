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
import { GroupsModule } from './group-relations/group/groups.module'
import { ProblemModule } from './problem/problem.module'
import { RolesModule } from './roles/roles.module'
import { UserSeasonTopicProblemModule } from './user-relations/user-group-season-topic-problem/user-season-topic-problem.module'
import { SeasonTopicProblemModule } from './season-relations/season-topic-problem/season-topic-problem.module'
import { SeasonTopicModule } from './season-relations/season-topic/season-topic.module'
import { SeasonModule } from './season-relations/season/season.module'
import { TagModule } from './tag/tag.module'
import { TopicModule } from './topic/topic.module'
import { UserGroupSeasonContestProblemModule } from './user-relations/user-group-season-contest-problem/user-group-season-contest-problem.module'
import { UserSeasonContestModule } from './user-relations/user-group-season-contest/user-season-contest.module'
import { UserProfileModule } from './user-relations/user-profile/user-profile.module'
import { UserSeasonTopicModule } from './user-relations/user-group-season-topic/user-season-topic.module'
import { UserModule } from './user-relations/user/user.module'
import { PrismaModule } from './prisma/prisma.module'
// import { DataAnalyticsModule } from './data-analytics/data-analytics.module'
import { ScheduleModule } from '@nestjs/schedule'
import { SeasonContestModule } from './season-relations/season-contest/season-contest.module'
import { GroupSeasonTopicModule } from './group-relations/group-season-topic/group-season-topic.module'
import { GroupSeasonContestModule } from './group-relations/group-season-contest/group-season-contest.module'
import { GroupSeasonModule } from './group-relations/group-season/group-season.module'
import { UserGroupSeasonModule } from './user-relations/user-group-season/user-group-season.module'
import { GroupSeasonTopicProblemModule } from './group-relations/group-season-topic-problem/group-season-topic-problem.module'

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
    UserSeasonTopicModule,
    SeasonTopicModule,
    SeasonTopicProblemModule,
    UserSeasonTopicProblemModule,
    ContestModule,
    UserSeasonContestModule,
    UserGroupSeasonContestProblemModule,
    PrismaModule,
    CaslModule,
    // DataAnalyticsModule,
    SeasonContestModule,
    GroupSeasonTopicModule,
    GroupSeasonContestModule,
    GroupSeasonModule,
    UserGroupSeasonModule,
    GroupSeasonTopicProblemModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
