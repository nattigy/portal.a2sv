import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLISODateTime, GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppService } from './app.service'
import { GroupsModule } from './groups/groups.module'
import { RolesModule } from './roles/roles.module'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { SeasonModule } from './season/season.module'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { ConfigModule } from '@nestjs/config'
import { AppResolver } from './app.resolver'
import { AuthModule } from './auth/auth.module'
import { TagModule } from './tag/tag.module'
import { ProblemModule } from './problem/problem.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req, res }) => ({
        req,
        res,
      }),
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault],
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
    PrismaModule,
    SeasonModule,
    AuthModule,
    TagModule,
    ProblemModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
