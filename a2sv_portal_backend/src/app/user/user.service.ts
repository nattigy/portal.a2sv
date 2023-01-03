import { Injectable, NotFoundException } from '@nestjs/common'
import { RoleEnum, StatusEnum } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { PaginationUser } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { PrismaService } from '../../prisma/prisma.service'
import { UpdateUserInput } from './dto/update-user.input'
import { FilterUserInput, UniqueUserInput } from './dto/filter-user-input'
import { UserRepository } from './user.repository'
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'

// export enum StatTimeRange {
//   MONTH,
//   WEEK,
//   ALL,
// }

// type sortComparator = (
//   a: User & { seasonTopicProblems: SeasonTopicProblemUser[] },
//   b: User & { seasonTopicProblems: SeasonTopicProblemUser[] },
// ) => number

// registerEnumType(StatTimeRange, { name: 'StatTimeRange' })

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { email, password} = createUserInput

    const foundUser = await this.userRepository.findOne({ email })

    if (foundUser) throw new Error('Email is already in use!')

    const saltOrRounds = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, saltOrRounds)

    return this.userRepository.create({
      email,
      password: hash,
      status: StatusEnum.ACTIVE,
      role: RoleEnum.STUDENT,
    })
  }

  async users(
    filterUserInput?: FilterUserInput,
    { take, skip }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUser> {
    // const name = filterUserInput?.name
    // delete filterUserInput?.name
    const usersCount = await this.userRepository.count(filterUserInput)
    const users: User[] = await this.userRepository.findAll({
      skip,
      take,
      where: {
        ...filterUserInput,
      },
    })
    return {
      items: users,
      pageInfo: {
        skip,
        take,
        count: usersCount,
      },
    }
  }

  async user({ id, email }: UniqueUserInput) {
    const user = this.userRepository.findOne({ id, email })
    if (!user) {
      throw new NotFoundException(`User with id or email${{ id, email }} not found`)
    }
    return user
  }

  async updateUser(updateUserInput: UpdateUserInput | UpdateUserInput[]) {
    if (Array.isArray(updateUserInput)) {
      let groupId = null
      if (updateUserInput.length > 0) groupId = updateUserInput[0].groupId
      return (
        await this.prismaService.user.updateMany({
          where: {
            id: { in: updateUserInput.map(u => u.userId) },
          },
          data: { groupId },
        })
      ).count
    }
    const { userId, ...updates } = updateUserInput
    // check if user with this Id exists and if it doesn't return
    // "user with this Id doesn't" exists error
    // If Email is about to be updated check if the email exists and
    //  return "That email is already registered" Error.

    const foundUser = await this.prismaService.user.findUnique({ where: { id: userId } })

    if (!foundUser) throw new NotFoundException(`User with id ${userId} does not exist!`)

    if (updates.email) {
      const foundUserByEmail = await this.prismaService.user.findUnique({
        where: { email: updates.email },
      })

      if (foundUserByEmail && foundUserByEmail.email !== foundUser.email)
        throw new Error('That email is already registered!')
    }

    return this.userRepository.update({
      where: { id: userId },
      data: updates,
    })
  }

  // async studentStats(id: string): Promise<StudentStat> {
  //   const user = await this.findById(id)
  //   if (!user) {
  //     throw new NotFoundException(`User with ${id} not found`)
  //   }
  //   const groupId = user.groupId
  //   if (!groupId) {
  //     throw new NotFoundException(`Group for User with ${id} not found`)
  //   }
  //   const group = await this.groupService.findOne(groupId)
  //
  //   const users = await this.prismaService.user.findMany({
  //     where: {
  //       role: RoleEnum.STUDENT,
  //       groupId: user.groupId,
  //     },
  //     include: {
  //       seasonTopicProblems: true,
  //     },
  //   })
  //
  //   const monthAgo = new Date()
  //   monthAgo.setMonth(monthAgo.getMonth() - 1)
  //   const weekAgo = new Date()
  //   weekAgo.setHours(weekAgo.getHours() - 24 * 7)
  //
  //   function getSortFunction(timeRange: StatTimeRange = StatTimeRange.MONTH): sortComparator {
  //     const after = new Date()
  //
  //     function solvedCounter(
  //       // first entry all time count, 2nd entry within month count, and 3rd entry within week count
  //       previous: number,
  //       current: SeasonTopicProblemUser,
  //     ) {
  //       if (current.solved) {
  //       }
  //       return previous
  //     }
  //
  //     switch (timeRange) {
  //       case StatTimeRange.WEEK:
  //         after.setHours(after.getHours() - 24 * 7)
  //         break
  //       case StatTimeRange.MONTH:
  //         after.setMonth(after.getMonth() - 1)
  //         break
  //       case StatTimeRange.ALL:
  //         after.setMonth(after.getMonth() - 12)
  //     }
  //     return (
  //       a: User & { seasonTopicProblems: SeasonTopicProblemUser[] },
  //       b: User & { seasonTopicProblems: SeasonTopicProblemUser[] },
  //     ) => {
  //       const cnt1 = a.seasonTopicProblems.reduce(solvedCounter, 0)
  //       const cnt2 = b.seasonTopicProblems.reduce(solvedCounter, 0)
  //       if (cnt1 > cnt2) {
  //         return 1
  //       } else if (cnt1 < cnt2) {
  //         return -1
  //       }
  //       return 0
  //     }
  //   }
  //
  //   function sortFunction(
  //     a: User & { seasonTopicProblems: SeasonTopicProblemUser[] },
  //     b: User & { seasonTopicProblems: SeasonTopicProblemUser[] },
  //   ): number {
  //     function solvedCounter(
  //       // first entry all time count, 2nd entry within month count, and 3rd entry within week count
  //       previous: [number, number, number],
  //       current: SeasonTopicProblemUser,
  //     ) {
  //       if (current.solved) {
  //         previous[0]++
  //         if (current.updatedAt >= monthAgo) {
  //           previous[1]++
  //           previous[2]++
  //         }
  //         if (current.updatedAt >= weekAgo) {
  //           previous[2]++
  //         }
  //       }
  //       return previous
  //     }
  //
  //     const cnt1 = a.seasonTopicProblems.reduce(solvedCounter, [0, 0, 0])
  //     const cnt2 = b.seasonTopicProblems.reduce(solvedCounter, [0, 0, 0])
  //     if (cnt1 > cnt2) {
  //       return 1
  //     } else if (cnt1 < cnt2) {
  //       return -1
  //     }
  //     return 0
  //   }
  //
  //   function getRank(comparator): number {
  //     users.sort(comparator)
  //
  //     const userIndex = users.findIndex(
  //       (curUser: User & { seasonTopicProblems: SeasonTopicProblemUser[] }) =>
  //         user.id == curUser.id,
  //     )
  //     if (userIndex < 0) {
  //       throw new NotFoundException(`User with id ${user.id} not found`)
  //     }
  //     return userIndex + 1
  //   }
  //
  //   const monthlyRank = getRank(getSortFunction(StatTimeRange.MONTH))
  //   const weeklyRank = getRank(getSortFunction(StatTimeRange.WEEK))
  //   const allTimeRank = getRank(getSortFunction(StatTimeRange.ALL))
  //   const totalUsers = users.length
  //
  //   const seasons = group.seasons
  //
  //   let numberOfCorrectSubmissions = 0
  //   let totalTimeDedicated = 0
  //   let totalAttempts = 0
  //   let unableToSolve = 0
  //   let unComfortability = 100
  //   let acceptanceRate = 0
  //   let easyCount = 0
  //   let mediumCount = 0
  //   let hardCount = 0
  //
  //   for (const season of seasons) {
  //     for (const topic of season.seasonTopics) {
  //       for (const p of topic.problems) {
  //         for (const userProblem of p.users) {
  //           if (userProblem.userId === id) {
  //             if (userProblem.solved) {
  //               numberOfCorrectSubmissions++
  //               switch (userProblem.seasonTopicProblem?.problem.difficulty.toUpperCase()) {
  //                 case 'EASY':
  //                   easyCount++
  //                   break
  //                 case 'HARD':
  //                   hardCount++
  //                   break
  //                 default:
  //                   mediumCount++
  //               }
  //             }
  //             totalAttempts += userProblem.attempts
  //             totalTimeDedicated += userProblem.timeDedicated
  //             if (userProblem.needHelp) unableToSolve++
  //           }
  //         }
  //       }
  //     }
  //   }
  //   if (numberOfCorrectSubmissions) {
  //     unComfortability = (unableToSolve / numberOfCorrectSubmissions) * 100
  //   }
  //
  //   const numberOfIncorrectSubmissions = totalAttempts - numberOfCorrectSubmissions
  //   if (totalAttempts) {
  //     acceptanceRate = (numberOfCorrectSubmissions / totalAttempts) * 100
  //   }
  //
  //   return {
  //     acceptanceRate,
  //     numberOfCorrectSubmissions,
  //     numberOfIncorrectSubmissions,
  //     totalTimeDedicated,
  //     unComfortability,
  //     easyCount,
  //     mediumCount,
  //     hardCount,
  //     weeklyRank,
  //     monthlyRank,
  //     allTimeRank,
  //     totalUsers,
  //   } as StudentStat
  // }

  // async studentContestConversionRate(studentId: string): Promise<ContestConversionRate> {
  //   const eachContestConversionRate = []
  //   let totalContestConversionRate = 0
  //   let totalNumberOfContest = 0
  //   let sumOfEachContestConversionRate = 0
  //
  //   const allUserContests = await this.userContestService.findAll(studentId)
  //   for (const userContest of allUserContests.items) {
  //     const userContestProblems = userContest.userContestProblems
  //     const totalConstestQuestions = userContestProblems.length
  //     totalNumberOfContest++
  //     let solvedInContest = 0
  //     userContestProblems.forEach(problem => {
  //       if (problem.status == 'SOLVED_IN_CONTEST') {
  //         solvedInContest += 1
  //       }
  //     })
  //     eachContestConversionRate.push({
  //       contestId: userContest.contestId,
  //       singleContestConvertionRate: solvedInContest / totalConstestQuestions,
  //     })
  //     sumOfEachContestConversionRate += eachContestConversionRate[userContest.contestId]
  //   }
  //   totalContestConversionRate = sumOfEachContestConversionRate / totalNumberOfContest
  //   return {
  //     eachContestConversionRate,
  //     totalContestConversionRate,
  //   }
  // }
  // async studentTopicStats({
  //   studentId,
  //   seasonId,
  // }: TopicStudentStatInput): Promise<TopicCoverageStat> {
  //   const eachTopicCoverageStat = []
  //   let totalTopicCoverage = 0
  //   let totalNumberOfTopics = 0
  //   let sumOfEachTopicsCoverage = 0
  //   const user = await this.findById(studentId)
  //   const group = await this.groupService.findOne(user.groupId)
  //   const seasonIndex = group.seasons.findIndex(s => s.id === seasonId)
  //   if (seasonIndex == -1) {
  //     throw new NotFoundException(`Season with ${seasonId} not found`)
  //   }
  //   const season = group.seasons[seasonIndex]
  //   let unableToSolve = 0
  //   let totalQuestions = 0
  //   let totalNotSolved = 0
  //
  //   for (const seasonTopic of season.seasonTopics) {
  //     const totalTopicQuestions = seasonTopic.problems?.length
  //     let numberOfSolvedProblems = 0
  //     totalNumberOfTopics++
  //     for (const problem of seasonTopic.problems) {
  //       for (const userProblem of problem.users) {
  //         if (userProblem.userId === studentId) {
  //           if (userProblem.solved) numberOfSolvedProblems++
  //           if (userProblem.needHelp) unableToSolve++
  //         }
  //       }
  //     }
  //     totalQuestions += totalTopicQuestions
  //     totalNotSolved += totalTopicQuestions - numberOfSolvedProblems
  //
  //     eachTopicCoverageStat.push({
  //       topicId: seasonTopic.topicId,
  //       questionCoverage: totalQuestions
  //         ? (numberOfSolvedProblems / totalTopicQuestions) * 100
  //         : 0,
  //       topicCoverage: (numberOfSolvedProblems / totalTopicQuestions) * 100,
  //     })
  //     sumOfEachTopicsCoverage += eachTopicCoverageStat[seasonTopic.topicId]
  //   }
  //
  //   totalTopicCoverage = sumOfEachTopicsCoverage / totalNumberOfTopics
  //   const unComfortability = (unableToSolve / (totalQuestions - totalNotSolved)) * 100
  //   return {
  //     eachTopicCoverageStat,
  //     totalTopicCoverage,
  //     unComfortability,
  //   }
  // }

  async removeUser(id: string) {
    try {
      await this.userRepository.remove({ id })
    } catch (e) {
      console.log(`Fail to delete user with id ${id}`, ' : ', e)
      throw new Error(`Fail to delete user with id ${id}`)
    }
    return 1
  }
}
