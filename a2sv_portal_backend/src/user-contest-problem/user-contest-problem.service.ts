import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateUserContestProblemInput, UserContestProblemId } from './dto/update-user-contest-problem.input'
import { PaginationUserContestProblem } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { UserContestProblem } from './entities/user-contest-problem.entity'
import { FilterUserContestProblemInput } from './dto/filter-user-contest-problem'

@Injectable()
export class UserContestProblemService {
  constructor(private readonly prismaService: PrismaService) {
  }

  // create(createUserContestProblemInput: CreateUserContestProblemInput) {
  //   return this.prismaService.userContestProblem.create({
  //     data: createUserContestProblemInput
  //   })
  // }

  async findAll(
    filterUserContestInput: FilterUserContestProblemInput,
    { skip, take }: PaginationInfoInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserContestProblem> {
    const count = (
      await this.prismaService.userContestProblem.findMany({
        where: filterUserContestInput,
      })
    ).length
    const userContests = await this.prismaService.userContestProblem.findMany({
      where: filterUserContestInput,
      include: {
        problem: true,
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

  async findOne({userId, contestId, problemId}: UserContestProblemId): Promise<UserContestProblem> {
    return this.prismaService.userContestProblem.findUnique({
      where: {
        userId_contestId_problemId: {
          userId,
          contestId,
          problemId,
        },
      },
      include: {
        problem: true,
      },
    })
  }

  async update({ userId, contestId, problemId, ...update }: UpdateUserContestProblemInput) {
    await this.prismaService.userContest.upsert({
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
      update: {
        contestId,
        userId,
      },
    })
    console.log("here")
    const f = await this.prismaService.userContest.findUnique({
      where: {
        userId_contestId: {
          userId, contestId
        }
      }
    })
    console.log(f)
    return this.prismaService.userContestProblem.upsert({
      include: {
        problem: true,
        contest: true,
        user: true,
      },
      where: {
        userId_contestId_problemId: {
          userId,
          contestId,
          problemId,
        },
      },
      create: {
        userContest: {
          connect: {
            userId_contestId: {
              userId,
              contestId,
            },
          },
        },
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
        problem: {
          connect: {
            id: problemId,
          },
        },
        ...update,
      },
      update: update,
    })
  }

  async remove({ userId, contestId, problemId }: UserContestProblemId) {
    try {
      await this.prismaService.userContestProblem.delete({
        where: {
          userId_contestId_problemId: {
            problemId,
            userId,
            contestId,
          },
        },
      })
    } catch (e) {
      console.log(`Fail to delete user contest problem with id ${userId}`, ' : ', e)
      throw new Error(`Fail to delete user contest problem with id ${userId}`)
    }
    return 1
  }
}
