import { Injectable } from '@nestjs/common'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { PrismaService } from '../prisma/prisma.service'
import { CreateContestInput } from './dto/create-contest.input'
import { UpdateContestInput } from './dto/update-contest.input'
import { Contest } from './entities/contest.entity'
import { FilterContestInput } from './dto/filter-contest.input'
import { PaginationContest } from '../common/page/pagination-info'

@Injectable()
export class ContestService {
  constructor(private readonly prismaService: PrismaService) {}

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
    { skip, take }: PaginationInfoInput = { take: 50, skip: 0 },
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
        groupContests: true,
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
        groupContests: true,
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
        groupContests: true,
      },
    })
  }

  async remove(contestId: string): Promise<number> {
    return 0
  }
}
