import { BadRequestException } from '@nestjs/common/exceptions'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { SeasonTopicId } from '../season-topic/dto/create-season-topic.input'
import { UpdateSeasonTopicResourceInput } from './dto/update-season-topic-resource.input'
import { SeasonTopicResource } from './entities/season-topic-resource.entity'
import { SeasonTopicResourceService } from './season-topic-resource.service'

@Resolver(() => SeasonTopicResource)
export class SeasonTopicResourceResolver {
  constructor(private readonly seasonTopicResourceService: SeasonTopicResourceService) {}

  @Mutation(() => SeasonTopicResource)
  async updateSeasonTopicResource(
    @Args('seasonTopicId') { seasonId, topicId }: SeasonTopicId,
    @Args('updateSeasonTopicResource')
    updateSeasonTopicResourceInput: UpdateSeasonTopicResourceInput,
  ): Promise<SeasonTopicResource> {
    try {
      return await this.seasonTopicResourceService.updateSeasonTopicResource(
        { seasonId, topicId },
        updateSeasonTopicResourceInput,
      )
    } catch (e) {
      console.error('Error', e)
      throw new BadRequestException('Error Updating seasonTopicResource!')
    }
  }

  @Mutation(() => SeasonTopicResource)
  async removeSeasonTopicResource(@Args('seasonTopicId') seasonTopicId: SeasonTopicId) {
    return this.seasonTopicResourceService.removeSeasonTopicResource(seasonTopicId)
  }
}
