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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault],
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      resolvers: { DateTime: GraphQLISODateTime },
    }),
    GroupsModule,
    RolesModule,
    UserModule,
    PrismaModule,
    SeasonModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
