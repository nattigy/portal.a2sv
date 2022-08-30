import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppService } from './app.service'
import { GroupsModule } from './groups/groups.module'
import { RolesModule } from './roles/roles.module'
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    GroupsModule,
    RolesModule,
    UserModule,
  ],
  providers: [AppService],
})
export class AppModule {}
