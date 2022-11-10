import { Injectable } from '@nestjs/common'
import { Problem } from '@prisma/client'
import { PaginationProblem } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProblemInput } from './dto/create-problem.input'
import { UpdateProblemInput } from './dto/update-problem.input'

@Injectable()
export class ProblemService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ tags, ...createInput }: CreateProblemInput): Promise<Problem> {
    return this.prismaService.problem.create({
      data: {
        ...createInput,
        tags: {
          connectOrCreate: tags.map(({ name }) => ({
            where: {
              name,
            },
            create: {
              name,
            },
          })),
        },
      },
    })
  }

  async findAll(
    pageInfoInput?: PaginationInfoInput,
  ): Promise<PaginationProblem> {
    const problemsCount = (await this.prismaService.problem.findMany({})).length
    const problems: Problem[] = await this.prismaService.problem.findMany({
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
        take: pageInfoInput.take,
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
