import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Tag } from '@prisma/client'
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.service'
import { ProblemAbilities } from '../casl/handler/problem-abilities.handler'
import { CheckPolicies } from '../casl/policy/policy.decorator'
import { PoliciesGuard } from '../casl/policy/policy.guard'
import { PaginationOutput } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { SeasonTopicProblem } from '../season-topic-problem/entities/season-topic-problem.entity'
import { CreateProblemInput } from './dto/create-problem.input'
import { UpdateProblemInput } from './dto/update-problem.input'
import { Problem } from './entities/problem.entity'
import { ProblemService } from './problem.service'
import { FilterProblemInput } from './dto/filter-problem-input'

@Resolver(() => Problem)
export class ProblemResolver {
  constructor(private readonly problemService: ProblemService) {}

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(ProblemAbilities.create)
  @Mutation(() => Problem)
  async createProblem(
    @Args('createProblemInput') createProblemInput: CreateProblemInput,
  ): Promise<Problem> {
    return await this.problemService.create(createProblemInput)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(ProblemAbilities.read)
  @Query(() => PaginationOutput<Problem>, {
    description: 'Find all problems with populated tags',
  })
  async problems(
    @Args('filterProblemInput', { type: () => PaginationInfoInput, nullable: true })
    filterProblemInput: FilterProblemInput,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ): Promise<PaginationOutput<Problem>> {
    return await this.problemService.findAll(filterProblemInput, pageInfoInput)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(ProblemAbilities.read)
  @Query(() => Problem, {
    name: 'problem',
    description: 'Find a unique problem by id',
  })
  async problem(@Args('id', { type: () => Int }) id: string): Promise<Problem> {
    return await this.problemService.findOne(id)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(ProblemAbilities.update)
  @Mutation(() => Problem)
  async updateProblem(
    @Args('updateProblemInput') updateProblemInput: UpdateProblemInput,
  ): Promise<Problem> {
    return this.problemService.update(updateProblemInput.id, updateProblemInput)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(ProblemAbilities.delete)
  @Mutation(() => Problem)
  async removeProblem(@Args('id', { type: () => Int }) id: string): Promise<Problem> {
    return this.problemService.remove(id)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(ProblemAbilities.read)
  @ResolveField()
  async tags(@Parent() problem: Problem): Promise<Tag[]> {
    return problem.tags
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(ProblemAbilities.read)
  @ResolveField(() => [SeasonTopicProblem], { nullable: 'itemsAndList' })
  seasonTopics(@Parent() problem: Problem): SeasonTopicProblem[] {
    return problem.seasonTopics
  }
}
