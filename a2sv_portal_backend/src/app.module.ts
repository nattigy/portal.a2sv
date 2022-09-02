import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppService } from './app.service'
import { GroupsModule } from './groups/groups.module'
import { RolesModule } from './roles/roles.module'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { SeasonModule } from './season/season.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      introspection: true,
      playground: true,
    }),
    GroupsModule,
    RolesModule,
    UserModule,
    PrismaModule,
    SeasonModule,
  ],
  providers: [AppService],
})
export class AppModule {}
