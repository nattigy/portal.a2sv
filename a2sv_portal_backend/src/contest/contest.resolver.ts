import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PaginationInput } from '../common/page/pagination.input'
import { ContestService } from './contest.service'
import { CreateContestInput } from './dto/create-contest.input'
import { UpdateContestInput } from './dto/update-contest.input'
import { Contest } from './entities/contest.entity'
import { FilterContestInput } from './dto/filter-contest.input'
import { PaginationContest } from '../common/page/pagination-info'

@Resolver(() => Contest)
export class ContestResolver {
  constructor(private readonly contestService: ContestService) {}

  @Mutation(() => Contest)
  async createContest(
    @Args('createContestInput') createContestInput: CreateContestInput,
  ): Promise<Contest> {
    return this.contestService.createContest(createContestInput)
  }

  @Query(() => PaginationContest)
  async contests(
    @Args('filterContestInput', { nullable: true }) filterContestInput?: FilterContestInput,
    @Args('pageInfoInput', { nullable: true }) pageInfoInput?: PaginationInput,
  ): Promise<PaginationContest> {
    return this.contestService.contests(filterContestInput, pageInfoInput)
  }

  @Query(() => Contest)
  async contest(@Args('contestId') contestId: string): Promise<Contest> {
    return this.contestService.contest(contestId)
  }

  @Mutation(() => Contest)
  async updateContest(
    @Args('updateContestInput') updateContestInput: UpdateContestInput,
    @Args('contestId') contestId: string,
  ): Promise<Contest> {
    return this.contestService.update(contestId, updateContestInput)
  }

  @Mutation(() => Contest)
  async removeProblemsFromContest(
    @Args('contestId') contestId: string,
    @Args('problemIds', { type: () => [String] }) problemIds: string[],
  ): Promise<Contest> {
    return this.contestService.removeProblemsFromContest(contestId, problemIds)
  }

  @Mutation(() => Int)
  async removeContest(@Args('contestId') contestId: string): Promise<number> {
    return this.contestService.removeContest(contestId)
  }
}
