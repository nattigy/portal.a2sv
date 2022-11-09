import { Injectable } from '@nestjs/common'
import { PaginationUserContests } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserContestInput } from './dto/create-user-contest.input'
import { UpdateUserContestInput } from './dto/update-user-contest.input'
import { UserContest } from './entities/user-contest.entity'

@Injectable()
export class UserContestService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createUserContestInput: CreateUserContestInput,
  ): Promise<UserContest> {
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

  async userContests(
    userId: string,
    { skip, take }: PaginationInfoInput,
  ): Promise<PaginationUserContests> {
    const count = (await this.prismaService.userContest.findMany({})).length
    const userContests: UserContest[] =
      await this.prismaService.userContest.findMany({
        where: {
          userId,
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
    return {
      items: userContests,
      pageInfo: {
        skip,
        take,
        count,
      },
    }
  }

  async userContest(userId: string, contestId: string) {
    return this.prismaService.userContest.findMany({
      where: {
        userId,
        contestId,
      },
      include: {
        userContestProblems: {
          include: {
            problem: true,
          },
        },
        user: true,
        contest: true,
      },
    })
  }

  async update({ userId, contestId, ...updates }: UpdateUserContestInput) {
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
    })
  }

  async remove(id: string): Promise<number> {
    return 0
  }
}
