import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { SeasonContestService } from './season-contest.service'
import { SeasonContest } from './entities/season-contest.entity'
import { CreateSeasonContestInput, SeasonContestId } from './dto/create-season-contest.input'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterSeasonContestInput } from './dto/filter-season-contest.input'

@Resolver(() => SeasonContest)
export class SeasonContestResolver {
  constructor(private readonly seasonContestService: SeasonContestService) {}

  @Mutation(() => SeasonContest)
  async createSeasonContest(
    @Args('createSeasonContestInput') createSeasonContestInput: CreateSeasonContestInput,
  ): Promise<SeasonContest> {
    return this.seasonContestService.createSeasonContest(createSeasonContestInput)
  }

  @Query(() => [SeasonContest])
  async seasonContests(
    @Args('filterSeasonContestInput', { nullable: true })
    filterSeasonContestInput?: FilterSeasonContestInput,
    @Args('pageInfoInput', { nullable: true }) pageInfoInput?: PaginationInput,
  ): Promise<SeasonContest[]> {
    return this.seasonContestService.seasonContests(filterSeasonContestInput)
  }

  @Query(() => SeasonContest)
  async seasonContest(
    @Args('seasonContestId') seasonContestId: SeasonContestId,
  ): Promise<SeasonContest> {
    return this.seasonContestService.seasonContest(seasonContestId)
  }

  @Mutation(() => SeasonContest)
  async removeSeasonContest(@Args('seasonContestId') seasonContestId: SeasonContestId) {
    return this.seasonContestService.removeSeasonContest(seasonContestId)
  }
}
