import { BadRequestException } from '@nestjs/common/exceptions'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UpdateSeasonTopicResourceInput } from './dto/update-season-topic-resource.input'
import { SeasonTopicResource } from './entities/season-topic-resource.entity'
import { SeasonTopicResourceService } from './season-topic-resource.service'
import { SeasonTopicResourceId } from './dto/create-season-topic-resource.input'

@Resolver(() => SeasonTopicResource)
export class SeasonTopicResourceResolver {
  constructor(private readonly seasonTopicResourceService: SeasonTopicResourceService) {}

  @Mutation(() => SeasonTopicResource)
  async updateSeasonTopicResource(
    @Args('seasonTopicResourceId') seasonTopicResourceId: SeasonTopicResourceId,
    @Args('updateSeasonTopicResource')
    updateSeasonTopicResourceInput: UpdateSeasonTopicResourceInput,
  ): Promise<SeasonTopicResource> {
    try {
      return await this.seasonTopicResourceService.updateSeasonTopicResource(
        seasonTopicResourceId,
        updateSeasonTopicResourceInput,
      )
    } catch (e) {
      console.error('Error', e)
      throw new BadRequestException('Error Updating seasonTopicResource!')
    }
  }

  @Mutation(() => SeasonTopicResource)
  async removeSeasonTopicResource(
    @Args('seasonTopicResourceId') seasonTopicResourceId: SeasonTopicResourceId,
  ) {
    return this.seasonTopicResourceService.removeSeasonTopicResource(seasonTopicResourceId)
  }
}
