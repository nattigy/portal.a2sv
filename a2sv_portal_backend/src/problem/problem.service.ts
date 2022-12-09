import { Injectable } from '@nestjs/common'
import { PaginationProblem } from '../common/page/pagination-info'
import { PaginationInput } from '../common/page/pagination.input'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProblemInput } from './dto/create-problem.input'
import { UpdateProblemInput } from './dto/update-problem.input'
import { FilterProblemInput } from './dto/filter-problem-input'
import { ProblemRepository } from './problem.repository'
import { Problem } from './entities/problem.entity'
import { Prisma } from '@prisma/client'

@Injectable()
export class ProblemService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly problemRepository: ProblemRepository,
  ) {
  }

  async createProblem({ tags, ...createInput }: CreateProblemInput): Promise<Problem> {
    return this.problemRepository.create({
      ...createInput,
      tags: {
        connectOrCreate: tags.map(t => ({
          where: { name: t.name },
          create: { name: t.name },
        })),
      },
    })
  }

  async problems(
    filterProblemInput?: FilterProblemInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationProblem> {
    // const tags = filterProblemInput?.tags
    // delete filterProblemInput?.tags
    const filter: Prisma.ProblemWhereInput = filterProblemInput
    // if(tags){
    //   filter.tags = { some: { name: { in: tags } } }
    // }
    const problems = await this.problemRepository.findAll({
      skip,
      take,
      where: filter,
    })
    const count = await this.problemRepository.count(filter)
    return {
      items: problems,
      pageInfo: { skip, take, count },
    }
  }

  async problem(problemId: string): Promise<Problem> {
    return this.problemRepository.findOne({ id: problemId })
  }

  async updateProblem({
                        tags,
                        problemId,
                        ...updateInput
                      }: UpdateProblemInput): Promise<Problem> {
    return this.problemRepository.update({
      where: { id: problemId },
      data: {
        ...updateInput,
        tags: { connect: tags },
      },
    })
  }

  async remove(id: string): Promise<number> {
    try {
      await this.problemRepository.remove({ id })
    } catch (e) {
      console.log(`Fail to delete problem with id ${id}`, ' : ', e)
      throw new Error(`Fail to delete problem with id ${id}`)
    }
    return 1
  }
}
