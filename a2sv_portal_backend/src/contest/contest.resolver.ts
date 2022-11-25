import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { ContestService } from './contest.service'
import { CreateContestInput } from './dto/create-contest.input'
import { UpdateContestInput } from './dto/update-contest.input'
import { Contest } from './entities/contest.entity'
import { FilterContestInput } from './dto/filter-contest.input'
import { PaginationContest } from '../common/page/pagination-info'

@Resolver(() => Contest)
export class ContestResolver {
  constructor(private readonly contestService: ContestService) {
  }

  @Mutation(() => Contest)
  async createContest(
    @Args('createContestInput') createContestInput: CreateContestInput,
  ): Promise<Contest> {
    return this.contestService.create(createContestInput)
  }

  @Query(() => PaginationContest)
  async contests(
    @Args('filterContestInput', { nullable: true }) filterContestInput?: FilterContestInput,
    @Args('pageInfoInput', { nullable: true }) pageInfoInput?: PaginationInfoInput,
  ): Promise<PaginationContest> {
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

  @Mutation(() => Contest)
  async removeProblemFromContest(
    @Args('contestId') contestId: string,
    @Args('problemId') problemId: string,
  ): Promise<Contest> {
    return this.contestService.removeProblemFromContest(contestId, problemId)
  }

  // @ResolveField(() => [Problem])
  // async problems(@Parent() contest: Contest) {
  //   return contest.problems
  // }

  @Mutation(() => Int)
  async removeContest(@Args('contestId') contestId: string): Promise<number> {
    return this.contestService.remove(contestId)
  }
}
