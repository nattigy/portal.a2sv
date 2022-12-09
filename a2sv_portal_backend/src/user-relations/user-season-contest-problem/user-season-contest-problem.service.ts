import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { UserSeasonContestService } from '../user-season-contest/user-season-contest.service'

@Injectable()
export class UserSeasonContestProblemService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userContestService: UserSeasonContestService,
  ) {}

  // create(createUserContestProblemInput: CreateUserContestProblemInput) {
  //   return this.prismaService.userContestProblem.create({
  //     data: createUserContestProblemInput
  //   })
  // }

  // async userContestProblems(
  //   filterUserContestInput: FilterUserContestProblemInput,
  //   { skip, take }: PaginationInput = { take: 50, skip: 0 },
  // ): Promise<PaginationUserSeasonContestProblem> {
  //   const count = (
  //     await this.prismaService.userContestProblem.findMany({
  //       where: filterUserContestInput,
  //     })
  //   ).length
  //   const userContests = await this.prismaService.userContestProblem.findMany({
  //     where: filterUserContestInput,
  //     include: {
  //       problem: true,
  //     },
  //   })
  //   return {
  //     items: userContests,
  //     pageInfo: {
  //       skip,
  //       take,
  //       count,
  //     },
  //   }
  // }
  //
  // async userContestProblem({
  //   userId,
  //   contestId,
  //   problemId,
  // }: UserContestProblemId): Promise<UserSeasonContestProblem> {
  //   return this.prismaService.userContestProblem.findUnique({
  //     where: {
  //       userId_contestId_problemId: {
  //         userId,
  //         contestId,
  //         problemId,
  //       },
  //     },
  //     include: {
  //       problem: true,
  //     },
  //   })
  // }
  //
  // async updateUserContestProblem({ userId, contestId, problemId, ...update }: UpdateUserContestProblemInput) {
  //   await this.userContestService.update({ userId, contestId })
  //   return this.prismaService.userContestProblem.upsert({
  //     include: {
  //       problem: true,
  //       contest: true,
  //       user: true,
  //     },
  //     where: {
  //       userId_contestId_problemId: {
  //         userId,
  //         contestId,
  //         problemId,
  //       },
  //     },
  //     create: {
  //       userContest: {
  //         connect: {
  //           userId_contestId: {
  //             userId,
  //             contestId,
  //           },
  //         },
  //       },
  //       contest: {
  //         connect: {
  //           id: contestId,
  //         },
  //       },
  //       user: {
  //         connect: {
  //           id: userId,
  //         },
  //       },
  //       problem: {
  //         connect: {
  //           id: problemId,
  //         },
  //       },
  //       ...update,
  //     },
  //     update,
  //   })
  // }
  //
  // async removeUserContestProblem({ userId, contestId, problemId }: UserContestProblemId) {
  //   try {
  //     await this.prismaService.userContestProblem.delete({
  //       where: {
  //         userId_contestId_problemId: {
  //           problemId,
  //           userId,
  //           contestId,
  //         },
  //       },
  //     })
  //   } catch (e) {
  //     console.log(`Fail to delete user contest problem with id ${userId}`, ' : ', e)
  //     throw new Error(`Fail to delete user contest problem with id ${userId}`)
  //   }
  //   return 1
  // }
}
