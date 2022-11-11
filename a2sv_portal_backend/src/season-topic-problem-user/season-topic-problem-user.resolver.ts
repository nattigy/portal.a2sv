import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateSeasonTopicProblemUserInput } from './dto/create-season-topic-problem-user.input'
import { SeasonTopicProblemUserId } from './dto/season-topic-problem-user.id'
import { UpdateSeasonTopicProblemUserInput } from './dto/update-season-topic-problem-user.input'
import { SeasonTopicProblemUser } from './entities/season-topic-problem-user.entity'
import { SeasonTopicProblemUserService } from './season-topic-problem-user.service'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { FilterSeasonTopicProblemUserInput } from './dto/filter-season-topic-problem-user.input'
import { PaginationOutput } from '../common/page/pagination-info'

@Resolver(() => SeasonTopicProblemUser)
export class SeasonTopicProblemUserResolver {
  constructor(private readonly seasonTopicProblemUserService: SeasonTopicProblemUserService) {}

  @Mutation(() => SeasonTopicProblemUser)
  async createSeasonTopicProblemUser(
    @Args('createSeasonTopicProblemUserInput')
    createSeasonTopicProblemUserInput: CreateSeasonTopicProblemUserInput,
  ): Promise<SeasonTopicProblemUser> {
    return this.seasonTopicProblemUserService.create(createSeasonTopicProblemUserInput)
  }

  @Query(() => PaginationOutput<SeasonTopicProblemUser>)
  async seasonTopicProblemUsers(
    @Args('filterSeasonTopicProblemUserInput', { nullable: true })
    filterSeasonTopicProblemUserInput: FilterSeasonTopicProblemUserInput,
    @Args('paginationInfoInput', { nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ): Promise<PaginationOutput<SeasonTopicProblemUser>> {
    return this.seasonTopicProblemUserService.findAll(
      filterSeasonTopicProblemUserInput,
      pageInfoInput,
    )
  }

  @Query(() => SeasonTopicProblemUser)
  async seasonTopicProblemUser(
    @Args('id', { type: () => SeasonTopicProblemUserId })
    id: SeasonTopicProblemUserId,
  ): Promise<SeasonTopicProblemUser> {
    return this.seasonTopicProblemUserService.findOne(id)
  }

  @Mutation(() => SeasonTopicProblemUser)
  async updateSeasonTopicProblemUser(
    @Args('updateSeasonTopicProblemUserInput')
    updateSeasonTopicProblemUserInput: UpdateSeasonTopicProblemUserInput,
  ): Promise<SeasonTopicProblemUser> {
    return this.seasonTopicProblemUserService.update(updateSeasonTopicProblemUserInput)
  }

  @Mutation(() => SeasonTopicProblemUser)
  async removeSeasonTopicProblemUser(
    @Args('id', { type: () => SeasonTopicProblemUserId })
    id: SeasonTopicProblemUserId,
  ) {
    return this.seasonTopicProblemUserService.remove(id)
  }
}
