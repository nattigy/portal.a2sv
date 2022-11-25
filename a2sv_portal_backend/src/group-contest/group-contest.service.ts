import { Injectable, NotFoundException } from '@nestjs/common'
import { PaginationGroupContests } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { PrismaService } from '../prisma/prisma.service'
import { UserContestProblemEnum } from '../user-contest-problem/entities/user-contest-problem-status.enum'
import { FilterGroupContestInput } from './dto/filter-group-contest.input'
import { GroupContestId, UpdateGroupContestInput } from './dto/update-group-contest.input'
import { GroupContest, GroupContestStat, ProblemsStat } from './entities/group-contest.entity'
import { UserContestService } from '../user-contest/user-contest.service'

@Injectable()
export class GroupContestService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userContestService: UserContestService,
  ) {}

  async findAll(
    filterGroupContestInput: FilterGroupContestInput,
    { skip, take }: PaginationInfoInput = { take: 50, skip: 0 },
  ): Promise<PaginationGroupContests> {
    const groupContests: GroupContest[] = await this.prismaService.groupContest.findMany({
      skip,
      take,
      where: filterGroupContestInput,
      include: {
        group: true,
        contest: {
          include: {
            problems: true,
          },
        },
      },
    })
    const count = (
      await this.prismaService.groupContest.findMany({
        where: filterGroupContestInput,
      })
    ).length
    return {
      items: groupContests,
      pageInfo: {
        skip,
        take,
        count,
      },
    }
  }

  async findOne({ groupId, contestId }: GroupContestId): Promise<GroupContestStat> {
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
              where: {
                contestId,
                user: {
                  groupId
                }
              },
              include: {
                userContestProblems: true,
              },
            },
          },
        },
      },
    })
    const problemStats: ProblemsStat[] = []
    //Number of students solved a problem {problemId: numberOfStudents}
    const probSolved: { [key: string]: number } = {}
    //Number of problems solved by a student {studentId: numberOfProblems}
    const userProb: { [key: string]: number } = {}
    //Number of problems solved by number of students {numberOfProblems: numberOfStudents}
    const probsNum: { [key: number]: number } = {}

    if (!groupContest) {
      throw new NotFoundException(`No groups and contests found`)
    }

    groupContest.contest.userContests.map(uc => {
      let problemsSolved = 0
      let wrongSubmissions = 0
      uc.userContestProblems.map(up => {
        if (up.status == UserContestProblemEnum.SOLVED_IN_CONTEST) {
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
    for (const [key, value] of Object.entries(probSolved)) {
      problemStats.push({
        // numberOfProblems: parseInt(key, 10),
        numberOfStudents: value,
        problemId: key,
        // problem: {}
        // problemsSolved: [],
      })
    }
    groupContest.contestAttendance = groupContest.contest.userContests.length
    // groupContest.problemsStat = problemStats
    return {
      ...groupContest,
      problemsStat: problemStats
    }
  }

  async update({
    groupId,
    contestId,
    ...updates
  }: UpdateGroupContestInput): Promise<GroupContest> {
    return this.prismaService.groupContest.upsert({
      where: {
        groupId_contestId: {
          groupId,
          contestId,
        },
      },
      update: updates,
      create: {
        contestId,
        groupId,
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

  async remove({ groupId, contestId }: GroupContestId) {
    try {
      await this.prismaService.groupContest.delete({
        where: {
          groupId_contestId: {
            groupId,
            contestId,
          },
        },
      })
    } catch (e) {
      console.log(`Fail to delete group contest with id ${groupId}`, ' : ', e)
      throw new Error(`Fail to delete group contest with id ${groupId}`)
    }
    return 1
  }
}
