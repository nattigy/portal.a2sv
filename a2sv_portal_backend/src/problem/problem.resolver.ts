import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PaginationProblem } from '../common/page/pagination-info'
import { PaginationInput } from '../common/page/pagination.input'
import { CreateProblemInput } from './dto/create-problem.input'
import { UpdateProblemInput } from './dto/update-problem.input'
import { Problem } from './entities/problem.entity'
import { ProblemService } from './problem.service'
import { FilterProblemInput } from './dto/filter-problem-input'
import descriptions from './problem.doc'

@Resolver(() => Problem)
export class ProblemResolver {
  constructor(private readonly problemService: ProblemService) {}

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(ProblemAbilities.create)
  @Mutation(() => Problem, { description: descriptions.createProblem })
  async createProblem(
    @Args('createProblemInput') createProblemInput: CreateProblemInput,
  ): Promise<Problem> {
    return await this.problemService.createProblem(createProblemInput)
  }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(ProblemAbilities.read)
  @Query(() => PaginationProblem, { description: 'Find all problems with populated tags' })
  async problems(
    @Args('filterProblemInput', { type: () => FilterProblemInput, nullable: true })
    filterProblemInput: FilterProblemInput,
    @Args('pageInfoInput', { type: () => PaginationInput, nullable: true })
    pageInfoInput?: PaginationInput,
  ): Promise<PaginationProblem> {
    return await this.problemService.problems(filterProblemInput, pageInfoInput)
  }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(ProblemAbilities.read)
  @Query(() => Problem, { description: descriptions.problem })
  async problem(@Args('problemId') problemId: string): Promise<Problem> {
    return await this.problemService.problem(problemId)
  }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(ProblemAbilities.update)
  @Mutation(() => Problem, { description: descriptions.updateProblem })
  async updateProblem(
    @Args('updateProblemInput') updateProblemInput: UpdateProblemInput,
  ): Promise<Problem> {
    return this.problemService.updateProblem(updateProblemInput)
  }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(ProblemAbilities.delete)
  @Mutation(() => Int, { description: descriptions.removeProblem })
  async removeProblem(@Args('problemId') problemId: string): Promise<number> {
    return this.problemService.remove(problemId)
  }
}
