import { Injectable } from '@nestjs/common'
import { PaginationInput } from '../common/page/pagination.input'
import { PrismaService } from '../prisma/prisma.service'
import { CreateContestInput } from './dto/create-contest.input'
import { UpdateContestInput } from './dto/update-contest.input'
import { Contest } from './entities/contest.entity'
import { FilterContestInput } from './dto/filter-contest.input'
import { PaginationContest } from '../common/page/pagination-info'
import { ContestRepository } from './contest.repository'

@Injectable()
export class ContestService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly contestRepository: ContestRepository,
    ) {}

  async create({ problems, ...createInput }: CreateContestInput): Promise<Contest> {
    return this.prismaService.contest.create({
      include: {
        problems: true,
        groupContests: true,
      },
      data: {
        ...createInput,
        problems: {
          connect: problems,
        },
      },
    })
  }

  async findAll(
    filterContestInput: FilterContestInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationContest> {
    const count = (
      await this.prismaService.contest.findMany({
        where: filterContestInput,
        select: {
          id: true,
        },
      })
    ).length
    const contests: Contest[] = await this.prismaService.contest.findMany({
      skip,
      take,
      where: filterContestInput,
      include: {
        problems: true,
        groupContests: {
          include: {
            group: true,
          },
        },
        userContests: true,
      },
    })
    return {
      items: contests,
      pageInfo: {
        skip,
        take,
        count,
      },
    }
  }

  async findOne(contestId: string): Promise<Contest> {
    return this.prismaService.contest.findUnique({
      where: {
        id: contestId,
      },
      include: {
        problems: true,
        groupContests: {
          include: {
            group: true,
          },
        },
        userContests: true,
      },
    })
  }

  async update({ problems, contestId, ...updateInput }: UpdateContestInput): Promise<Contest> {
    return this.prismaService.contest.update({
      where: {
        id: contestId,
      },
      data: {
        ...updateInput,
        problems: {
          connect: problems,
        },
      },
      include: {
        problems: true,
        groupContests: {
          include: {
            group: true,
          },
        },
        userContests: true,
      },
    })
  }

  async removeProblemFromContest(contestId: string, problemId: string): Promise<Contest> {
    return this.prismaService.contest.update({
      where: {
        id: contestId,
      },
      data: {
        problems: {
          disconnect: {
            id: problemId,
          },
        },
      },
      include: {
        problems: true,
        groupContests: {
          include: {
            group: true,
          },
        },
        userContests: true,
      },
    })
  }

  async remove(id: string): Promise<number> {
    try {
      await this.prismaService.contest.delete({ where: { id } })
    } catch (e) {
      console.log(`Fail to delete contest with id ${id}`, ' : ', e)
      throw new Error(`Fail to delete contest with id ${id}`)
    }
    return 1
  }
}
