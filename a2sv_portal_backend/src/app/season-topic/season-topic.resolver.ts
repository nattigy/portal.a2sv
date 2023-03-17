import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateSeasonTopicInput, SeasonTopicId } from './dto/create-season-topic.input'
import { SeasonTopic } from './entities/season-topic.entity'
import { SeasonTopicService } from './season-topic.service'
import descriptions from './season-topic.doc'
import { PaginationSeasonTopic } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.service'
import { PoliciesGuard } from '../../casl/policy/policy.guard'
import { CheckPolicies } from '../../casl/policy/policy.decorator'
import { SeasonTopicAbilities } from '../../casl/handler/season-topic-abilities.handler'

@Resolver(() => SeasonTopic)
export class SeasonTopicResolver {
  constructor(private readonly seasonTopicService: SeasonTopicService) {}

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(SeasonTopicAbilities.create)
  @Mutation(() => SeasonTopic, { description: descriptions.createSeasonTopic })
  async addTopicsToASeason(
    @Args('createSeasonTopicInput')
    createSeasonTopicInput: CreateSeasonTopicInput,
  ): Promise<SeasonTopic> {
    return this.seasonTopicService.addTopicsToASeason(createSeasonTopicInput)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(SeasonTopicAbilities.read)
  @Mutation(() => SeasonTopic)
  async addResourcesToSeasonTopic(
    @Args('createSeasonTopicInput') createSeasonTopicInput: CreateSeasonTopicInput,
  ): Promise<SeasonTopic> {
    return this.seasonTopicService.addResourceToSeasonTopic(createSeasonTopicInput)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(SeasonTopicAbilities.read)
  @Query(() => SeasonTopic, { description: descriptions.seasonTopic })
  async seasonTopic(
    @Args('seasonTopicId') seasonTopicId: SeasonTopicId,
  ): Promise<SeasonTopic> {
    return this.seasonTopicService.seasonTopic(seasonTopicId)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(SeasonTopicAbilities.read)
  @Query(() => PaginationSeasonTopic, { description: descriptions.seasonTopics })
  async seasonsTopics(
    @Args('seasonId') seasonId: string,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ): Promise<PaginationSeasonTopic> {
    return this.seasonTopicService.seasonsTopics({ seasonId }, paginationInput)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(SeasonTopicAbilities.delete)
  @Mutation(() => SeasonTopic, { description: descriptions.removeSeasonTopic })
  async removeSeasonTopic(@Args('seasonTopicId') seasonTopicId: SeasonTopicId) {
    return this.seasonTopicService.removeSeasonTopic(seasonTopicId)
  }
}
