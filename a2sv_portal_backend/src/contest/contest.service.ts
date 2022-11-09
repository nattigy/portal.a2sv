import { Injectable } from '@nestjs/common'
import { PaginationContest } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { PrismaService } from '../prisma/prisma.service'
import { CreateContestInput } from './dto/create-contest.input'
import { UpdateContestInput } from './dto/update-contest.input'
import { Contest } from './entities/contest.entity'

@Injectable()
export class ContestService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    problems,
    ...createInput
  }: CreateContestInput): Promise<Contest> {
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

  async findAll({
    skip,
    take,
  }: PaginationInfoInput): Promise<PaginationContest> {
    const count = (await this.prismaService.contest.findMany({})).length
    const contests: Contest[] = await this.prismaService.contest.findMany({
      skip,
      take,
      include: {
        problems: true,
        groupContests: true,
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

  async update(updateContestInput: UpdateContestInput): Promise<Contest> {
    return this.prismaService.contest.update({
      where: {
        id: updateContestInput.contestId,
      },
      data: {
        ...updateContestInput,
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
