import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateUserContestProblemInput } from './dto/update-user-contest-problem.input'
import { PaginationOutput } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { UserContestProblem } from './entities/user-contest-problem.entity'
import { FilterUserContestProblemInput } from './dto/filter-user-contest-problem'

@Injectable()
export class UserContestProblemService {
  constructor(private readonly prismaService: PrismaService) {}

  // create(createUserContestProblemInput: CreateUserContestProblemInput) {
  //   return this.prismaService.userContestProblem.create({
  //     data: createUserContestProblemInput
  //   })
  // }

  async findAll(
    filterUserContestInput: FilterUserContestProblemInput,
    { skip, take }: PaginationInfoInput = { take: 50, skip: 0 },
  ): Promise<PaginationOutput<UserContestProblem>> {
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

  async findOne(
    userId: string,
    contestId: string,
    problemId: string,
  ): Promise<UserContestProblem> {
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
        numberOfAttempts: update.numberOfAttempts,
        numberOfMinutes: update.numberOfMinutes,
        status: update.status,
      },
      update: update,
    })
  }

  async remove(id: number) {
    return `This action removes a #${id} userContestProblem`
  }
}
