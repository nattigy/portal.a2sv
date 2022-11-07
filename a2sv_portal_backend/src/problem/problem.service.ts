import { Injectable } from '@nestjs/common'
import { CreateProblemInput } from './dto/create-problem.input'
import { UpdateProblemInput } from './dto/update-problem.input'
import { PrismaService } from '../prisma.service'
import { Problem } from '@prisma/client'
import { TagService } from '../tag/tag.service'
import { PageInfoInput } from '../common/page/page-info.input'
import { ProblemsPage } from '../common/page/page-info'

@Injectable()
export class ProblemService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProblemInput: CreateProblemInput): Promise<Problem> {
    const { tags, ...problem } = createProblemInput
    const problemTags = tags.map(async ({ name }) => {
      const tag = await this.prismaService.tag.upsert({
        where: { name: name.toUpperCase() },
        update: { name: name.toUpperCase() },
        create: { name: name.toUpperCase() },
      })
      return { id: tag.id }
    })
    let newProblem: any
    await Promise.all(problemTags).then((results) => {
      newProblem = this.prismaService.problem.create({
        data: {
          ...problem,
          tags: {
            connect: results,
          },
        },
        include: {
          tags: true,
          seasonTopics: {
            include: {
              problem: true,
            },
          },
        },
      })
    })
    return newProblem
  }

  async findAll(pageInfoInput?: PageInfoInput): Promise<ProblemsPage<Problem>> {
    const problemsCount = (await this.prismaService.problem.findMany({})).length
    const problems = await this.prismaService.problem.findMany({
      include: {
        tags: true,
        seasonTopics: {
          include: {
            problem: true,
          },
        },
      },
    })
    return {
      items: problems,
      pageInfo: {
        skip: pageInfoInput.skip,
        limit: pageInfoInput.limit,
        count: problemsCount,
      },
    }
  }

  async findOne(id: string): Promise<Problem> {
    return this.prismaService.problem.findUnique({
      where: { id },
      include: {
        tags: true,
        seasonTopics: {
          include: {
            problem: true,
          },
        },
      },
    })
  }

  async update(
    id: string,
    updateProblemInput: UpdateProblemInput,
  ): Promise<Problem> {
    return this.prismaService.problem.update({
      where: { id },
      data: updateProblemInput,
      include: {
        tags: true,
        seasonTopics: {
          include: {
            problem: true,
          },
        },
      },
    })
  }

  async remove(id: string): Promise<Problem | null> {
    return this.prismaService.problem.delete({ where: { id } })
  }
}
