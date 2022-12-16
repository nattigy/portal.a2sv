import { Resolver } from '@nestjs/graphql'
import { ContestService } from './contest.service'
import { Contest } from './entities/contest.entity'

@Resolver(() => Contest)
export class ContestResolver {
  constructor(private readonly contestService: ContestService) {}

  // @Mutation(() => Contest)
  // async createContest(
  //   @Args('createContestInput') createContestInput: CreateContestInput,
  // ): Promise<Contest> {
  //   return this.contestService.createContest(createContestInput)
  // }
  //
  // @Query(() => PaginationContest)
  // async contests(
  //   @Args('filterContestInput', { nullable: true }) filterContestInput?: FilterContestInput,
  //   @Args('pageInfoInput', { nullable: true }) pageInfoInput?: PaginationInput,
  // ): Promise<PaginationContest> {
  //   return this.contestService.contests(filterContestInput, pageInfoInput)
  // }
  //
  // @Query(() => Contest)
  // async contest(@Args('contestId') contestId: string): Promise<Contest> {
  //   return this.contestService.contest(contestId)
  // }
  //
  // @Mutation(() => Contest)
  // async updateContest(
  //   @Args('updateContestInput') updateContestInput: UpdateContestInput,
  // ): Promise<Contest> {
  //   return this.contestService.update(updateContestInput)
  // }
  //
  // @Mutation(() => Contest)
  // async removeProblemsFromContest(
  //   @Args('contestId') contestId: string,
  //   @Args('problemIds', { type: () => [String] }) problemIds: string[],
  // ): Promise<Contest> {
  //   return this.contestService.removeProblemsFromContest(contestId, problemIds)
  // }
  //
  // @Mutation(() => Int)
  // async removeContest(@Args('contestId') contestId: string): Promise<number> {
  //   return this.contestService.removeContest(contestId)
  // }
}
