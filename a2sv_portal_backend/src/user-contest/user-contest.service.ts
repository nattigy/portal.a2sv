import { Injectable } from '@nestjs/common'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserContestInput } from './dto/create-user-contest.input'
import { UpdateUserContestInput } from './dto/update-user-contest.input'
import { UserContest } from './entities/user-contest.entity'
import { PaginationOutput } from '../common/page/pagination-info'
import { FilterUserContestInput } from './dto/filter-user-contest.input'

@Injectable()
export class UserContestService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserContestInput: CreateUserContestInput): Promise<UserContest> {
    return this.prismaService.userContest.create({
      data: createUserContestInput,
      include: {
        userContestProblems: {
          include: {
            problem: true,
          },
        },
        user: true,
        contest: {
          include: {
            problems: true,
            groupContests: true,
          },
        },
      },
    })
  }

  async findAll(
    filterUserContestInput: FilterUserContestInput,
    { skip, take }: PaginationInfoInput,
  ): Promise<PaginationOutput<UserContest>> {
    const count = (
      await this.prismaService.userContest.findMany({
        where: filterUserContestInput,
      })
    ).length
    const userContests: UserContest[] = await this.prismaService.userContest.findMany({
      where: filterUserContestInput,
      include: {
        userContestProblems: {
          include: {
            problem: true,
          },
        },
        user: true,
        contest: {
          include: {
            problems: true,
            groupContests: true,
          },
        },
      },
    })
    return {
      items: userContests,
      pageInfo: {
        skip,
        take,
        count,
      },
    }
  }

  async findOne(userId: string, contestId: string): Promise<UserContest> {
    return this.prismaService.userContest.findUnique({
      where: {
        userId_contestId: {
          userId,
          contestId,
        },
      },
      include: {
        userContestProblems: {
          include: {
            problem: true,
          },
        },
        user: true,
        contest: {
          include: {
            problems: true,
            groupContests: true,
          },
        },
      },
    })
  }

  async update({
    userId,
    contestId,
    ...updates
  }: UpdateUserContestInput): Promise<UserContest> {
    return this.prismaService.userContest.upsert({
      where: {
        userId_contestId: {
          userId,
          contestId,
        },
      },
      create: {
        contest: {
          connect: {
            id: contestId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      update: updates,
      include: {
        userContestProblems: {
          include: {
            problem: true,
          },
        },
        user: true,
        contest: {
          include: {
            problems: true,
            groupContests: true,
          },
        },
      },
    })
  }

  async remove(id: string): Promise<number> {
    return 0
  }
}
