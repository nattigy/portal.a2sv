import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLISODateTime, GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppService } from './app.service'
import { GroupsModule } from './group/groups.module'
import { RolesModule } from './roles/roles.module'
import { UserModule } from './user/user.module'
import { SeasonModule } from './season/season.module'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { ConfigModule } from '@nestjs/config'
import { AppResolver } from './app.resolver'
import { AuthModule } from './auth/auth.module'
import { TagModule } from './tag/tag.module'
import { ProblemModule } from './problem/problem.module'
import { TopicModule } from './topic/topic.module'
import { GroupTopicSeasonModule } from './group-topic-season/group-topic-season.module'
import { GroupTopicSeasonProblemModule } from './group-topic-season-problem/group-topic-season-problem.module'
import { GroupTopicSeasonProblemUserModule } from './group-topic-season-problem-user/group-topic-season-problem-user.module'
import { UserProfileModule } from './user-profile/user-profile.module'

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
    GroupTopicSeasonModule,
    UserProfileModule,
    GroupTopicSeasonProblemModule,
    GroupTopicSeasonProblemUserModule,
    GroupTopicSeasonModule,
    GroupTopicSeasonProblemModule,
    GroupTopicSeasonProblemUserModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
