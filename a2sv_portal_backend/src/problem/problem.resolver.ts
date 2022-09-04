import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { ProblemService } from './problem.service'
import { Problem } from './entities/problem.entity'
import { CreateProblemInput } from './dto/create-problem.input'
import { UpdateProblemInput } from './dto/update-problem.input'
import { Tag } from '@prisma/client'
import { Roles } from 'src/auth/auth.decorator'

@Resolver(() => Problem)
export class ProblemResolver {
  constructor(private readonly problemService: ProblemService) {}

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
  @Mutation(() => Problem)
  async createProblem(
    @Args('createProblemInput') createProblemInput: CreateProblemInput,
  ): Promise<Problem> {
    return await this.problemService.create(createProblemInput)
  }

  @Query(() => [Problem], {
    name: 'problems',
    description: 'Find all problems with populated tags',
  })
  async problems(): Promise<Problem[]> {
    return await this.problemService.findAll()
  }

  @Query(() => Problem, {
    name: 'problem',
    description: 'Find a unique problem by id',
  })
  async problem(@Args('id', { type: () => Int }) id: number): Promise<Problem> {
    return await this.problemService.findOne(id)
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION', 'ASSISTANT')
  @Mutation(() => Problem)
  async updateProblem(
    @Args('updateProblemInput') updateProblemInput: UpdateProblemInput,
  ): Promise<Problem> {
    return this.problemService.update(updateProblemInput.id, updateProblemInput)
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION', 'ASSISTANT')
  @Mutation(() => Problem)
  async removeProblem(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Problem> {
    return this.problemService.remove(id)
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION', 'ASSISTANT')
  @ResolveField()
  async tags(@Parent() problem: Problem): Promise<Tag[]> {
    return problem.tags
  }
}
