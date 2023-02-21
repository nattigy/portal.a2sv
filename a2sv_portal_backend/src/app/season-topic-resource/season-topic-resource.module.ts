import { Module } from '@nestjs/common'
import { SeasonTopicResourceRepository } from './season-topic-resource.repository'
import { SeasonTopicResourceResolver } from './season-topic-resource.resolver'
import { SeasonTopicResourceService } from './season-topic-resource.service'

@Module({
  providers: [
    SeasonTopicResourceRepository,
    SeasonTopicResourceResolver,
    SeasonTopicResourceService,
  ],
  exports: [
    SeasonTopicResourceRepository,
    SeasonTopicResourceResolver,
    SeasonTopicResourceService,
  ],
})
export class SeasonTopicResourceModule {}
