import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppService } from './app.service'
import { GroupsModule } from './groups/groups.module'
import { SeasonModule } from './season/season.module';
import { RolesModule } from './roles/roles.module'
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    GroupsModule,
    SeasonModule,
    RolesModule,
    TopicModule,
  ],
  providers: [AppService],
})
export class AppModule { }
