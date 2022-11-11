import { Injectable } from '@nestjs/common'
import { Problem } from '@prisma/client'
import { PaginationOutput } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProblemInput } from './dto/create-problem.input'
import { UpdateProblemInput } from './dto/update-problem.input'
import { FilterProblemInput } from './dto/filter-problem-input'

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
    filterProblemInput: FilterProblemInput,
    { skip, take }: PaginationInfoInput,
  ): Promise<PaginationOutput<Problem>> {
    const problemsCount = (
      await this.prismaService.problem.findMany({
        where: filterProblemInput,
        select: {
          id: true,
        },
      })
    ).length
    const problems: Problem[] = await this.prismaService.problem.findMany({
      skip,
      take,
      where: filterProblemInput,
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
        skip,
        take,
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

  async update(id: string, updateProblemInput: UpdateProblemInput): Promise<Problem> {
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
