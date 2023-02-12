import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { SeasonContestService } from './season-contest.service'
import { SeasonContest } from './entities/season-contest.entity'
import { PaginationInput } from 'src/common/page/pagination.input'
import { CreateSeasonContestInput, SeasonContestId } from './dto/create-season-contest.input'
import { FilterSeasonContestInput } from './dto/filter-season-contest.input'

@Resolver(() => SeasonContest)
export class SeasonContestResolver {
  constructor(private readonly seasonContestService: SeasonContestService) {}

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(SeasonContestAbilities.create)
  @Mutation(() => SeasonContest)
  async addContestToASeason(
    @Args('createSeasonContestInput') createSeasonContestInput: CreateSeasonContestInput,
  ): Promise<SeasonContest> {
    return this.seasonContestService.addContestToASeason(createSeasonContestInput)
  }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(SeasonContestAbilities.read)
  @Query(() => [SeasonContest])
  async seasonContests(
    @Args('filterSeasonContestInput', { nullable: true })
    filterSeasonContestInput?: FilterSeasonContestInput,
    @Args('pageInfoInput', { nullable: true }) pageInfoInput?: PaginationInput,
  ): Promise<SeasonContest[]> {
    return this.seasonContestService.seasonContests(filterSeasonContestInput)
  }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(SeasonContestAbilities.read)
  @Query(() => SeasonContest)
  async seasonContest(
    @Args('seasonContestId') seasonContestId: SeasonContestId,
  ): Promise<SeasonContest> {
    return this.seasonContestService.seasonContest(seasonContestId)
  }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(SeasonContestAbilities.delete)
  @Mutation(() => SeasonContest)
  async removeSeasonContest(@Args('seasonContestId') seasonContestId: SeasonContestId) {
    return this.seasonContestService.removeSeasonContest(seasonContestId)
  }
}
