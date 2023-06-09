import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ContestService } from './contest.service'
import { Contest } from './entities/contest.entity'
import { PaginationContest } from 'src/common/page/pagination-info'
import { FilterContestInput } from './dto/filter-contest.input'
import { PaginationInput } from '../../common/page/pagination.input'
import { BadRequestException, UseGuards } from '@nestjs/common'
import { PoliciesGuard } from '../../casl/policy/policy.guard'
import { CheckPolicies } from '../../casl/policy/policy.decorator'
import { ContestAbilities } from '../../casl/handler/contest-abilities.handler'
import { UpdateContestInput } from './dto/update-contest.input'

@Resolver(() => Contest)
export class ContestResolver {
  constructor(private readonly contestService: ContestService) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies(ContestAbilities.read)
  @Query(() => PaginationContest)
  async contests(
    @Args('filterContestInput', { nullable: true }) filterContestInput?: FilterContestInput,
    @Args('pageInfoInput', { nullable: true }) pageInfoInput?: PaginationInput,
  ): Promise<PaginationContest> {
    try {
      return this.contestService.contests(filterContestInput, pageInfoInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to load contests!')
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(ContestAbilities.read)
  @Query(() => Contest)
  async contest(@Args('contestId') contestId: string): Promise<Contest> {
    try {
      return this.contestService.contest(contestId)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to load contest!')
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(ContestAbilities.update)
  @Mutation(() => Contest)
  async updateContest(
    @Args('updateContestInput') updateContestInput: UpdateContestInput,
  ): Promise<Contest> {
    try {
      return this.contestService.update(updateContestInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to update contest!')
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(ContestAbilities.delete)
  @Mutation(() => Int)
  async removeContest(@Args('contestId') contestId: string): Promise<number> {
    try {
      return this.contestService.removeContest(contestId)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to remove contest!')
    }
  }
}
