import {Injectable, NotFoundException} from '@nestjs/common';
import {UpdateGroupContestInput} from './dto/update-group-contest.input';
import {PrismaService} from "../prisma.service";
import {FindGroupContestInput} from "./dto/find-group-contest.input";
import {GroupContestStat, ProblemsStat} from './dto/group-contest-stat-response';
import {UserContestProblemEnum} from "../user-contest-problem/entities/user-contest-problem.entity";

@Injectable()
export class GroupContestService {
  constructor(private readonly prismaService: PrismaService) {
  }

  // create(createGroupContestInput: CreateGroupContestInput) {
  //   return this.prismaService.groupContest.create({
  //     data: createGroupContestInput
  //   })
  // }

  // async findAll() {
  //   return ""
  // }

  async groupContestStat({groupId, contestId}: FindGroupContestInput): Promise<GroupContestStat> {
    const problemStats: ProblemsStat[] = []
    const groupContestStat: GroupContestStat = {
      contestAttendance: 0,
      contestId: contestId,
      groupId: groupId,
      problemsStat: problemStats
    }
    const groupContest = await this.prismaService.groupContest.findUnique({
      where: {
        groupId_contestId: {
          groupId,
          contestId
        }
      },
      include: {
        contest: {
          include: {
            userContests: {
              include: {
                userContestProblems: {
                  include: {
                    problem: true
                  }
                }
              }
            }
          }
        }
      }
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

    groupContest.contest.userContests.map(uc => {
      let problemsSolved = 0
      let wrongSubmissions = 0
      uc.userContestProblems.map(up => {
        if (up.status == UserContestProblemEnum.SOLVED) {
          problemsSolved += 1
          if (!userProb[up.userId])
            probSolved[up.problemId] = 1
          else
            probSolved[up.problemId] += 1
          if (!userProb[up.userId])
            userProb[up.userId] = 1
          else
            userProb[up.userId] += 1
        }
        wrongSubmissions += up.numberOfAttempts
      })
      uc.problemsSolved = problemsSolved
      uc.wrongSubmissions = wrongSubmissions
    })
    for (const [, value] of Object.entries(userProb)) {
      if (!probsNum[value])
        probsNum[value] = 1
      else
        probsNum[value] += 1
    }
    for (const [key, value] of Object.entries(probsNum)) {
      problemStats.push({
        numberOfProblems: parseInt(key, 10),
        numberOfStudents: value,
        problems: []
      })
    }
    return groupContestStat
  }

  async findOne({contestId, groupId}: FindGroupContestInput) {
    const groupContest = await this.prismaService.groupContest.findUnique({
      where: {
        groupId_contestId: {
          contestId,
          groupId
        }
      },
      include: {
        group: true,
        contest: {
          include: {
            userContests: {
              include: {
                userContestProblems: true
              }
            }
          }
        }
      }
    })
    groupContest.contestAttendance = groupContest.contest.userContests.length
    return groupContest
  }

  update(id: number, updateGroupContestInput: UpdateGroupContestInput) {
    return `This action updates a #${id} groupContest`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupContest`;
  }
}
