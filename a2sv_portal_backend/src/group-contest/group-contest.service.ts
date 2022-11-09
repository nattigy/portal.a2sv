import { Injectable, NotFoundException } from '@nestjs/common'
import { PaginationGroupContest } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { PrismaService } from '../prisma/prisma.service'
import { UserContestProblemEnum } from '../user-contest-problem/entities/user-contest-problem-status.enum'
import { FindGroupContestInput } from './dto/find-group-contest.input'
import { UpdateGroupContestInput } from './dto/update-group-contest.input'
import { GroupContest, ProblemsStat } from './entities/group-contest.entity'

@Injectable()
export class GroupContestService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({
    skip,
    take,
  }: PaginationInfoInput): Promise<PaginationGroupContest> {
    const groupContests: GroupContest[] =
      await this.prismaService.groupContest.findMany({
        skip,
        take,
      })
    const count = (await this.prismaService.groupContest.findMany({})).length
    return {
      items: groupContests,
      pageInfo: {
        skip,
        take,
        count,
      },
    }
  }

  async groupContests(
    groupId: string,
    { skip, take }: PaginationInfoInput,
  ): Promise<PaginationGroupContest> {
    const count = (
      await this.prismaService.groupContest.findMany({
        where: {
          groupId,
        },
      })
    ).length
    const groupContests = await this.prismaService.groupContest.findMany({
      skip,
      take,
      where: {
        groupId,
      },
      include: {
        contest: {
          include: {
            problems: true,
            groupContests: true,
          },
        },
        group: {
          include: {
            users: true,
          },
        },
      },
    })
    return {
      items: groupContests,
      pageInfo: {
        take,
        skip,
        count,
      },
    }
  }

  async groupContestStat({
    groupId,
    contestId,
  }: FindGroupContestInput): Promise<GroupContest> {
    const problemStats: ProblemsStat[] = []
    const groupContestStat: GroupContest = {
      contestAttendance: 0,
      contestId: contestId,
      groupId: groupId,
      problemsStat: problemStats,
    }
    const groupContest = await this.prismaService.groupContest.findUnique({
      where: {
        groupId_contestId: {
          groupId,
          contestId,
        },
      },
      include: {
        contest: {
          include: {
            userContests: {
              include: {
                userContestProblems: {
                  include: {
                    problem: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    //Number of students solved a problem {problemId: numberOfStudents}
    const probSolved: { [key: string]: number } = {}
    //Number of problems solved by a student {studentId: numberOfProblems}
    const userProb: { [key: string]: number } = {}
    //Number of problems solved by number of students {numberOfProblems: numberOfStudents}
    const probsNum: { [key: number]: number } = {}

    if (!groupContest) {
      throw new NotFoundException(`No groups and contests found`)
    }

    groupContest.contest.userContests.map((uc) => {
      let problemsSolved = 0
      let wrongSubmissions = 0
      uc.userContestProblems.map((up) => {
        if (up.status == UserContestProblemEnum.SOLVED) {
          problemsSolved += 1
          if (!userProb[up.userId]) probSolved[up.problemId] = 1
          else probSolved[up.problemId] += 1
          if (!userProb[up.userId]) userProb[up.userId] = 1
          else userProb[up.userId] += 1
        }
        wrongSubmissions += up.numberOfAttempts
      })
      uc.problemsSolved = problemsSolved
      uc.wrongSubmissions = wrongSubmissions
    })
    for (const [, value] of Object.entries(userProb)) {
      if (!probsNum[value]) probsNum[value] = 1
      else probsNum[value] += 1
    }
    for (const [key, value] of Object.entries(probsNum)) {
      problemStats.push({
        numberOfProblems: parseInt(key, 10),
        numberOfStudents: value,
        problems: [],
      })
    }
    return groupContestStat
  }

  async groupContest({
    contestId,
    groupId,
  }: FindGroupContestInput): Promise<GroupContest> {
    const groupContest = await this.prismaService.groupContest.findUnique({
      where: {
        groupId_contestId: {
          contestId,
          groupId,
        },
      },
      include: {
        group: true,
        contest: {
          include: {
            problems: true,
            groupContests: true,
            userContests: {
              include: {
                userContestProblems: true,
              },
            },
          },
        },
      },
    })
    groupContest.contestAttendance = groupContest.contest.userContests.length
    return groupContest
  }

  async update({
    groupId,
    contestId,
    ...updates
  }: UpdateGroupContestInput): Promise<GroupContest> {
    return this.prismaService.groupContest.update({
      where: {
        groupId_contestId: {
          groupId,
          contestId,
        },
      },
      data: {
        ...updates,
      },
      include: {
        contest: {
          include: {
            problems: true,
            groupContests: true,
          },
        },
        group: true,
      },
    })
  }

  async remove(groupId: string, contestId: string) {
    return 0
  }
}
