import { Module } from '@nestjs/common';
import { UsersUpdateTopicComfortabilityService } from './users-update-topic-comfortability.service';
import { UsersUpdateTopicComfortabilityResolver } from './users-update-topic-comfortability.resolver';

@Module({
  providers: [UsersUpdateTopicComfortabilityResolver, UsersUpdateTopicComfortabilityService]
})
export class UsersUpdateTopicComfortabilityModule {}
