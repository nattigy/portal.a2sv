import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { ProblemService } from './problem.service'
import { Problem } from './entities/problem.entity'
import { CreateProblemInput } from './dto/create-problem.input'
import { UpdateProblemInput } from './dto/update-problem.input'
import { Tag } from '@prisma/client'
import { Roles } from 'src/auth/auth.decorator'
import { SeasonTopicProblem } from '../season-topic-problem/entities/season-topic-problem.entity'
import { PageInfoInput } from '../common/page/page-info.input'
import { ProblemsPage } from '../common/page/page-info'

@Resolver(() => Problem)
export class ProblemResolver {
  constructor(private readonly problemService: ProblemService) {}

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Mutation(() => Problem)
  async createProblem(
    @Args('createProblemInput') createProblemInput: CreateProblemInput,
  ): Promise<Problem> {
    return await this.problemService.create(createProblemInput)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Query(() => ProblemsPage<Problem>, {
    name: 'problems',
    description: 'Find all problems with populated tags',
  })
  async problems(
    @Args('pageInfoInput', { type: () => PageInfoInput, nullable: true })
    pageInfoInput?: PageInfoInput,
  ) {
    return await this.problemService.findAll(pageInfoInput)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Query(() => Problem, {
    name: 'problem',
    description: 'Find a unique problem by id',
  })
  async problem(@Args('id', { type: () => Int }) id: string): Promise<Problem> {
    return await this.problemService.findOne(id)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Mutation(() => Problem)
  async updateProblem(
    @Args('updateProblemInput') updateProblemInput: UpdateProblemInput,
  ): Promise<Problem> {
    return this.problemService.update(updateProblemInput.id, updateProblemInput)
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION', 'ASSISTANT')
  @Mutation(() => Problem)
  async removeProblem(
    @Args('id', { type: () => Int }) id: string,
  ): Promise<Problem> {
    return this.problemService.remove(id)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @ResolveField()
  async tags(@Parent() problem: Problem): Promise<Tag[]> {
    return problem.tags
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @ResolveField(() => [SeasonTopicProblem], { nullable: 'itemsAndList' })
  seasonTopics(@Parent() problem: Problem): SeasonTopicProblem[] {
    return problem.seasonTopics
  }
}
