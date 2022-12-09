import { Module } from '@nestjs/common'
import { UserSeasonTopicResolver } from './user-season-topic.resolver'
import { UserSeasonTopicService } from './user-season-topic.service'
import { UserSeasonTopicRepository } from './user-season-topic.repository'

@Module({
  providers: [UserSeasonTopicRepository, UserSeasonTopicResolver, UserSeasonTopicService],
})
export class UserSeasonTopicModule {
}
