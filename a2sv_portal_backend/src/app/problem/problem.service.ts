import { Injectable, NotFoundException } from '@nestjs/common'
import { PaginationProblem } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { PrismaService } from '../../prisma/prisma.service'
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
  ) {}

  async createProblem({ tags, ...createInput }: CreateProblemInput): Promise<Problem> {
    // TODO: check if problem with this link exists and if it does return
    // TODO: "problem with this link already" exists error
    const foundLink = await this.prismaService.problem.findUnique({
      where: { link: createInput.link },
    })

    if (foundLink) throw new Error('Problem with this link already exists!')

    return await this.problemRepository.create({
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
    const tags = filterProblemInput?.tags
    const filter: Prisma.ProblemWhereInput = {
      // id?: String,
      // title?: StringFilter,
      // platform?: string,
      // link?: string,
      // difficulty?: ProblemDifficultyTypeEnum,
      // tags?: string[],
      // createdAt?: DateTimeFilter,
    }
    if(tags){
      filter.tags = { some: { name: { in: tags } } }
    }
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
    // check if problem with this Id exists and if it doesn't return
    // "problem with this Id doesn't" exists error
    const foundProblem = await this.problemRepository.findOne({ id: problemId })
    if (!foundProblem)
      throw new NotFoundException(`Problem with id ${problemId} does not exist!`)
    return foundProblem
  }

  async updateProblem({
    tags,
    problemId,
    ...updateInput
  }: UpdateProblemInput): Promise<Problem> {
    // check if problem with this Id exists and if it doesn't return
    // "problem with this Id doesn't" exists error

    // if there is a link in the updateInput check if the link is updated
    // and if the link is new link, check if there exists a problem with that
    // link and throw "problem with this link already exists" error

    const foundProblem = await this.prismaService.problem.findUnique({
      where: { id: problemId },
    })

    if (!foundProblem)
      throw new NotFoundException(`Problem with id ${problemId} does not exist!`)

    if (updateInput.link) {
      const foundProblemByLink = await this.prismaService.problem.findUnique({
        where: { link: updateInput.link },
      })

      if (foundProblemByLink && foundProblemByLink.link !== foundProblem.link)
        throw new Error('Problem with this link already exists!')
    }

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
