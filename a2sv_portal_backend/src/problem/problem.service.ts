import { Injectable } from '@nestjs/common'
import { Problem } from '@prisma/client'
import { PaginationProblem } from '../common/page/pagination-info'
import { PaginationInput } from '../common/page/pagination.input'
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
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationProblem> {
    const problemsCount = (
      await this.prismaService.problem.findMany({
        where: {
          ...filterProblemInput,
          tags: filterProblemInput?.tags && {
            some: {
              name: {
                in: filterProblemInput?.tags,
              },
            },
          },
        },
        select: {
          id: true,
        },
      })
    ).length
    const problems: Problem[] = await this.prismaService.problem.findMany({
      skip,
      take,
      where: {
        ...filterProblemInput,
        tags: filterProblemInput?.tags && {
          some: {
            name: {
              in: filterProblemInput?.tags,
            },
          },
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

  async update(id: string, { tags, ...updateInput }: UpdateProblemInput): Promise<Problem> {
    return this.prismaService.problem.update({
      where: { id },
      data: {
        ...updateInput,
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

  async remove(id: string): Promise<number> {
    try {
      await this.prismaService.problem.delete({ where: { id } })
    } catch (e) {
      console.log(`Fail to delete problem with id ${id}`, ' : ', e)
      throw new Error(`Fail to delete problem with id ${id}`)
    }
    return 1
  }
}
