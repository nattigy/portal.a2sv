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

<<<<<<< HEAD
  @Mutation(() => Problem, {
    description: 'Create a problem with optional tags',
  })
=======
  @Roles('admin', 'head_of_academy', 'head_of_education')
  @Mutation(() => Problem)
>>>>>>> backend.auth
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

<<<<<<< HEAD
  @Mutation(() => Problem, { description: 'Update a given problem' })
=======
  @Roles('admin', 'head_of_academy', 'head_of_education')
  @Mutation(() => Problem)
>>>>>>> backend.auth
  async updateProblem(
    @Args('updateProblemInput') updateProblemInput: UpdateProblemInput,
  ): Promise<Problem> {
    return this.problemService.update(updateProblemInput.id, updateProblemInput)
  }

<<<<<<< HEAD
  @Mutation(() => Problem, { description: 'Remove a problem by id' })
=======
  @Roles('admin', 'head_of_academy', 'head_of_education')
  @Mutation(() => Problem)
>>>>>>> backend.auth
  async removeProblem(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Problem> {
    return this.problemService.remove(id)
  }

  @Roles('admin', 'head_of_academy', 'head_of_education')
  @ResolveField()
  async tags(@Parent() problem: Problem): Promise<Tag[]> {
    return problem.tags
  }
}
