import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { Problem } from '../problem/entities/problem.entity'
import { ContestService } from './contest.service'
import { CreateContestInput } from './dto/create-contest.input'
import { UpdateContestInput } from './dto/update-contest.input'
import { Contest } from './entities/contest.entity'
import { FilterContestInput } from './dto/filter-contest.input'
import { PaginationOutput } from '../common/page/pagination-info'

@Resolver(() => Contest)
export class ContestResolver {
  constructor(private readonly contestService: ContestService) {}

  @Mutation(() => Contest)
  async createContest(
    @Args('createContestInput') createContestInput: CreateContestInput,
  ): Promise<Contest> {
    return this.contestService.create(createContestInput)
  }

  @Query(() => PaginationOutput<Contest>)
  async contests(
    @Args('filterContestInput', { type: () => FilterContestInput, nullable: true })
    filterContestInput?: FilterContestInput,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ): Promise<PaginationOutput<Contest>> {
    return this.contestService.findAll(filterContestInput, pageInfoInput)
  }

  @Query(() => Contest)
  async contest(@Args('contestId') contestId: string): Promise<Contest> {
    return this.contestService.findOne(contestId)
  }

  @Mutation(() => Contest)
  async updateContest(
    @Args('updateContestInput') updateContestInput: UpdateContestInput,
  ): Promise<Contest> {
    return this.contestService.update(updateContestInput)
  }

  @Mutation(() => Int)
  async removeContest(@Args('contestId') contestId: string): Promise<number> {
    return this.contestService.remove(contestId)
  }

  @ResolveField(() => [Problem])
  async problems(@Parent() contest: Contest) {
    return contest.problems
  }
}
