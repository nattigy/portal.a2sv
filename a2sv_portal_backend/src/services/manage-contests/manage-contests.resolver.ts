import { Args, Int, Mutation, Resolver } from '@nestjs/graphql'
import { ManageContestsService } from './manage-contests.service'
import { BadRequestException, UseGuards } from '@nestjs/common'
import { PoliciesGuard } from '../../casl/policy/policy.guard'
import { CheckPolicies } from '../../casl/policy/policy.decorator'
import { ContestAbilities } from '../../casl/handler/contest-abilities.handler'
import { Contest } from '../../app/contest/entities/contest.entity'
import { CreateContestInput } from '../../app/contest/dto/create-contest.input'

@Resolver()
export class ManageContestsResolver {
  constructor(private readonly manageContestService: ManageContestsService) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies(ContestAbilities.create)
  @Mutation(() => Contest)
  async createContest(
    @Args('createContestInput') createContestInput: CreateContestInput,
  ): Promise<Contest> {
    try {
      return this.manageContestService.createContest(createContestInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to create contest!')
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(ContestAbilities.create)
  @Mutation(() => Int)
  async addProblemsToContest(
    @Args('contestId') contestId: string,
    @Args('problemIds', { type: () => [String] }) problemIds: string[],
  ): Promise<number> {
    try {
      return this.manageContestService.addProblemsToContest(contestId, problemIds)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to create contest!')
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(ContestAbilities.create)
  @Mutation(() => Int)
  async removeProblemsFromContest(
    @Args('contestId') contestId: string,
    @Args('problemIds', { type: () => [String] }) problemIds: string[],
  ): Promise<number> {
    try {
      return this.manageContestService.removeProblemsFromContest(contestId, problemIds)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to create contest!')
    }
  }
}
