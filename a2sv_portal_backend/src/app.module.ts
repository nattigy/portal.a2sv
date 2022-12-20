import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLISODateTime, GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CaslModule } from './casl/casl.module'
import { ContestModule } from './app/contest/contest.module'
import { GroupModule } from './app/group/group.module'
import { ProblemModule } from './app/problem/problem.module'
import { RolesModule } from './roles/roles.module'
import { UserGroupSeasonTopicProblemModule } from './app/user-group-season-topic-problem/user-group-season-topic-problem.module'
import { SeasonTopicProblemModule } from './app/season-topic-problem/season-topic-problem.module'
import { SeasonTopicModule } from './app/season-topic/season-topic.module'
import { SeasonModule } from './app/season/season.module'
import { TagModule } from './app/tag/tag.module'
import { TopicModule } from './app/topic/topic.module'
import { UserGroupSeasonContestProblemModule } from './app/user-group-season-contest-problem/user-group-season-contest-problem.module'
import { UserGroupSeasonContestModule } from './app/user-group-season-contest/user-group-season-contest.module'
import { UserProfileModule } from './app/user-profile/user-profile.module'
import { UserGroupSeasonTopicModule } from './app/user-group-season-topic/user-group-season-topic.module'
import { UserModule } from './app/user/user.module'
import { PrismaModule } from './prisma/prisma.module'
// import { DataAnalyticsModule } from './data-analytics/data-analytics.module'
import { ScheduleModule } from '@nestjs/schedule'
import { SeasonContestModule } from './app/season-contest/season-contest.module'
import { GroupSeasonTopicModule } from './app/group-season-topic/group-season-topic.module'
import { GroupSeasonContestModule } from './app/group-season-contest/group-season-contest.module'
import { GroupSeasonModule } from './app/group-season/group-season.module'
import { UserGroupSeasonModule } from './app/user-group-season/user-group-season.module'
import { GroupSeasonTopicProblemModule } from './app/group-season-topic-problem/group-season-topic-problem.module'
import { GroupSeasonContestProblemModule } from './app/group-season-contest-problem/group-season-contest-problem.module'
import { ServicesModule } from './services/services.module';

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
    // GroupModule,
    RolesModule,
    // UserModule,
    // SeasonModule,
    TagModule,
    ProblemModule,
    TopicModule,
    UserProfileModule,
    // UserGroupSeasonTopicModule,
    // SeasonTopicModule,
    // SeasonTopicProblemModule,
    // UserGroupSeasonTopicProblemModule,
    // ContestModule,
    // UserGroupSeasonContestModule,
    // UserGroupSeasonContestProblemModule,
    PrismaModule,
    CaslModule,
    // DataAnalyticsModule,
    // SeasonContestModule,
    // GroupSeasonTopicModule,
    // GroupSeasonContestModule,
    // GroupSeasonModule,
    // UserGroupSeasonModule,
    // GroupSeasonTopicProblemModule,
    // GroupSeasonContestProblemModule,
    ServicesModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
