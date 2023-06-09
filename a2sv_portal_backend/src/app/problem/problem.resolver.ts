import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PaginationProblem } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { CreateProblemInput } from './dto/create-problem.input'
import { UpdateProblemInput } from './dto/update-problem.input'
import { Problem } from './entities/problem.entity'
import { ProblemService } from './problem.service'
import { FilterProblemInput } from './dto/filter-problem-input'
import descriptions from './problem.doc'
import { UseGuards } from '@nestjs/common'
import { CheckPolicies } from '../../casl/policy/policy.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.service'
import { PoliciesGuard } from '../../casl/policy/policy.guard'
import { ProblemAbilities } from '../../casl/handler/problem-abilities.handler'
import { BadRequestException } from '@nestjs/common/exceptions'

@Resolver(() => Problem)
export class ProblemResolver {
  constructor(private readonly problemService: ProblemService) {}

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(ProblemAbilities.create)
  @Mutation(() => Problem, { description: descriptions.createProblem })
  async createProblem(
    @Args('createProblemInput') createProblemInput: CreateProblemInput,
  ): Promise<Problem> {
    try {
      return await this.problemService.createProblem(createProblemInput)
    } catch (e) {
      console.log('Error: ', e)
      throw new BadRequestException('Error creating a problem!')
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(ProblemAbilities.read)
  @Query(() => PaginationProblem, { description: 'Find all problems with populated tags' })
  async problems(
    @Args('filterProblemInput', { type: () => FilterProblemInput, nullable: true })
    filterProblemInput?: FilterProblemInput,
    @Args('pageInfoInput', { type: () => PaginationInput, nullable: true })
    pageInfoInput?: PaginationInput,
  ): Promise<PaginationProblem> {
    try {
      return await this.problemService.problems(filterProblemInput, pageInfoInput)
    } catch (e) {
      console.log('Error: ', e)
      throw new BadRequestException('Error loading problems!')
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(ProblemAbilities.read)
  @Query(() => Problem, { description: descriptions.problem })
  async problem(@Args('problemId') problemId: string): Promise<Problem> {
    try {
      return await this.problemService.problem(problemId)
    } catch (e) {
      console.log('Error: ', e)
      throw new BadRequestException('Error loading a problem!')
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(ProblemAbilities.update)
  @Mutation(() => Problem, { description: descriptions.updateProblem })
  async updateProblem(
    @Args('updateProblemInput') updateProblemInput: UpdateProblemInput,
  ): Promise<Problem> {
    try {
      return this.problemService.updateProblem(updateProblemInput)
    } catch (e) {
      console.log('Error: ', e)
      throw new BadRequestException('Error updating a problem!')
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(ProblemAbilities.delete)
  @Mutation(() => Int, { description: descriptions.removeProblem })
  async removeProblem(@Args('problemId') problemId: string): Promise<number> {
    try {
      return this.problemService.remove(problemId)
    } catch (e) {
      console.log('Error: ', e)
      throw new BadRequestException('Error removing a problem!')
    }
  }
}
