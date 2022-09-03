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

@Resolver(() => Problem)
export class ProblemResolver {
  constructor(private readonly problemService: ProblemService) {}

  @Mutation(() => Problem)
  async createProblem(
    @Args('createProblemInput') createProblemInput: CreateProblemInput,
  ): Promise<Problem> {
    return await this.problemService.create(createProblemInput)
  }

  @Query(() => [Problem], { name: 'problems' })
  async problems(): Promise<Problem[]> {
    return await this.problemService.findAll()
  }

  @Query(() => Problem, { name: 'problem' })
  async problem(@Args('id', { type: () => Int }) id: number): Promise<Problem> {
    return await this.problemService.findOne(id)
  }

  @Mutation(() => Problem)
  async updateProblem(
    @Args('updateProblemInput') updateProblemInput: UpdateProblemInput,
  ): Promise<Problem> {
    return this.problemService.update(updateProblemInput.id, updateProblemInput)
  }

  @Mutation(() => Problem)
  async removeProblem(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Problem> {
    return this.problemService.remove(id)
  }

  @ResolveField()
  async tags(@Parent() problem: Problem): Promise<Tag[]> {
    return problem.tags
  }
}
