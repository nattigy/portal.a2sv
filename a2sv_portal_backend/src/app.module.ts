import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLISODateTime, GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CaslModule } from './casl/casl.module'
import { ProblemModule } from './app/problem/problem.module'
import { RolesModule } from './roles/roles.module'
import { TagModule } from './app/tag/tag.module'
import { TopicModule } from './app/topic/topic.module'
import { UserProfileModule } from './app/user-profile/user-profile.module'
import { PrismaModule } from './prisma/prisma.module'
// import { DataAnalyticsModule } from './data-analytics/data-analytics.module'
import { ScheduleModule } from '@nestjs/schedule'
import { ServicesModule } from './services/services.module'

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
