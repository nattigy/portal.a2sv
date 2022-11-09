import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLISODateTime, GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { join } from 'path'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CaslModule } from './casl/casl.module'
import { PoliciesGuard } from './casl/policy/policy.guard'
import { ContestModule } from './contest/contest.module'
import { GroupContestModule } from './group-contest/group-contest.module'
import { GroupsModule } from './group/groups.module'
import { ProblemModule } from './problem/problem.module'
import { RolesModule } from './roles/roles.module'
import { SeasonTopicProblemUserModule } from './season-topic-problem-user/season-topic-problem-user.module'
import { SeasonTopicProblemModule } from './season-topic-problem/season-topic-problem.module'
import { SeasonTopicModule } from './season-topic/season-topic.module'
import { SeasonModule } from './season/season.module'
import { TagModule } from './tag/tag.module'
import { TopicModule } from './topic/topic.module'
import { UserContestProblemModule } from './user-contest-problem/user-contest-problem.module'
import { UserContestModule } from './user-contest/user-contest.module'
import { UserProfileModule } from './user-profile/user-profile.module'
import { UserTopicModule } from './user-topic/user-topic.module'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
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
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      introspection: true,
      resolvers: { DateTime: GraphQLISODateTime },
    }),
    GroupsModule,
    RolesModule,
    UserModule,
    SeasonModule,
    AuthModule,
    TagModule,
    ProblemModule,
    TopicModule,
    UserProfileModule,
    UserTopicModule,
    SeasonTopicModule,
    SeasonTopicProblemModule,
    SeasonTopicProblemUserModule,
    ContestModule,
    UserContestModule,
    UserContestProblemModule,
    GroupContestModule,
    PrismaModule,
    CaslModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
