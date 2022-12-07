import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { SeasonTopicProblemUserId } from './dto/season-topic-problem-user.id'
import { UpdateSeasonTopicProblemUserInput } from './dto/update-season-topic-problem-user.input'
import { UserSeasonTopicProblem } from './entities/user-season-topic-problem.entity'
import { FilterSeasonTopicUserProblemInput } from './dto/filter-season-topic-user-problem.input'
import { PaginationInput } from '../../common/page/pagination.input'
import { PaginationSeasonTopicProblemUser } from '../../common/page/pagination-info'
import { SeasonTopicProblem } from '../../season-relations/season-topic-problem/entities/season-topic-problem.entity'
import { User } from '../user/entities/user.entity'
import { UserSeasonTopicProblemRepository } from './user-season-topic-problem.repository'
import { GroupSeasonTopicProblem } from 'src/group-relations/group-season-topic-problem/entities/group-season-topic-problem.entity'
import { GroupSeasonTopicProblemRepository } from 'src/group-relations/group-season-topic-problem/group-season-topic-problem.repository'

@Injectable()
export class UserSeasonTopicProblemService {
  constructor(
    private readonly userSeasonTopicProblemRepository: UserSeasonTopicProblemRepository,
    private readonly groupSeasonTopicProblemRepository: GroupSeasonTopicProblemRepository,
    private readonly prismaService: PrismaService,
  ) { }

  async userSeasonTopicProblem(
    { seasonId, topicId, problemId, userId }: SeasonTopicProblemUserId
  ): Promise<UserSeasonTopicProblem> {
    let userSeasonTopicProblem: UserSeasonTopicProblem =
      await this.userSeasonTopicProblemRepository.findOne({
        userId_seasonId_topicId_problemId: {
          seasonId, topicId, problemId, userId
        }
      })
    if (userSeasonTopicProblem === null || userSeasonTopicProblem === undefined) {
      const user = await this.prismaService.user.findUnique({ where: { id: userId } })
      const groupSeasonTopicProblem: GroupSeasonTopicProblem = await this.groupSeasonTopicProblemRepository.findOne({
        groupId_seasonId_topicId_problemId: {
          seasonId, topicId, problemId, groupId: user.groupId
        }
      })
      userSeasonTopicProblem = {
        seasonId, topicId, problemId, userId,
        solved: false, attempts: 0, needHelp: false, solutionLink: "", timeDedicated: 0,
        seasonTopicProblem: {
          seasonId, topicId, problemId,
          seasonTopic: groupSeasonTopicProblem.groupSeasonTopic.seasonTopic,
          problem: groupSeasonTopicProblem.problem,
        },
        user
      }
    }
    return userSeasonTopicProblem
  }

  async findAll(
    filterSeasonTopicProblemUserInput: FilterSeasonTopicUserProblemInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationSeasonTopicProblemUser> {
    const count = (
      await this.prismaService.seasonTopicProblemUser.findMany({
        where: filterSeasonTopicProblemUserInput,
      })
    ).length
    const seasonTopicProblemUsers: UserSeasonTopicProblem[] =
      await this.prismaService.seasonTopicProblemUser.findMany({
        where: filterSeasonTopicProblemUserInput,
        include: {
          seasonTopicProblem: {
            include: {
              seasonTopic: true,
              problem: true,
            },
          },
          user: true,
        },
      })
    return {
      items: seasonTopicProblemUsers,
      pageInfo: {
        skip,
        take,
        count,
      },
    }
  }

  async seasonTopicUserProblems(
    seasonId: string,
    userId: string,
    topicId: string,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationSeasonTopicProblemUser> {
    const count = 0
    const seasonTopicUserProblems: UserSeasonTopicProblem[] = []
    const seasonTopicProblems: SeasonTopicProblem[] =
      await this.prismaService.seasonTopicProblem.findMany({
        skip,
        take,
        where: {
          seasonId,
          topicId,
        },
        include: {
          problem: true,
          seasonTopic: true,
        },
      })
    for (const seasonTopicProblem of seasonTopicProblems) {
      const seasonTopicUserProblem: UserSeasonTopicProblem = await this.userSeasonTopicProblem({
        userId,
        seasonId,
        topicId,
        problemId: seasonTopicProblem.problemId,
      })
      seasonTopicUserProblems.push(seasonTopicUserProblem)
    }
    return {
      items: seasonTopicUserProblems,
      pageInfo: {
        skip,
        take,
        count,
      },
    }
  }

  async seasonTopicUsersProblem(
    seasonId: string,
    topicId: string,
    groupId: string,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationSeasonTopicProblemUser> {
    const count = (
      await this.prismaService.user.findMany({
        where: {
          groupId,
        },
      })
    ).length
    const seasonTopicUserProblems: UserSeasonTopicProblem[] = []
    const seasonTopicProblems: SeasonTopicProblem[] =
      await this.prismaService.seasonTopicProblem.findMany({
        where: {
          seasonId,
          topicId,
        },
        include: {
          problem: true,
          seasonTopic: true,
        },
      })
    const users: User[] = await this.prismaService.user.findMany({
      take,
      skip,
      where: {
        groupId,
      },
    })
    for (const user of users) {
      for (const seasonTopicProblem of seasonTopicProblems) {
        const seasonTopicUserProblem: UserSeasonTopicProblem = await this.userSeasonTopicProblem({
          userId: user.id,
          seasonId,
          topicId,
          problemId: seasonTopicProblem.problemId,
        })
        seasonTopicUserProblems.push(seasonTopicUserProblem)
      }
    }
    return {
      items: seasonTopicUserProblems,
      pageInfo: {
        skip,
        take,
        count,
      },
    }
  }

  async update({
    id,
    ...updates
  }: UpdateSeasonTopicProblemUserInput): Promise<UserSeasonTopicProblem> {
    const { seasonId, problemId, userId, topicId } = id
    let number_wrong_sub: number
    if (updates.solved) {
      await this.prismaService.userAnalytics.update({
        where: {
          userId_createdAt: {
            userId,
            createdAt: new Date(),
          },
        },
        data: {
          solvedCount: {
            increment: 1,
          },
        },
      })
    } else if (updates.solved == false) {
      number_wrong_sub = updates.attempts > 0 ? updates.attempts : 1
      await this.prismaService.userAnalytics.update({
        where: {
          userId_createdAt: {
            userId,
            createdAt: new Date(),
          },
        },
        data: {
          wrongCount: {
            increment: number_wrong_sub,
          },
        },
      })
    }

    console.log('===status ==updated')
    return this.prismaService.seasonTopicProblemUser.upsert({
      where: {
        seasonId_topicId_problemId_userId: {
          seasonId,
          topicId,
          problemId,
          userId,
        },
      },
      create: {
        seasonTopicProblem: {
          connect: {
            seasonId_topicId_problemId: {
              seasonId,
              topicId,
              problemId,
            },
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        ...updates,
      },
      update: updates,
      include: {
        seasonTopicProblem: {
          include: {
            seasonTopic: true,
            problem: true,
          },
        },
        user: true,
      },
    })
  }

  async problemSolved({ seasonId, topicId, problemId, userId }: SeasonTopicProblemUserId) {
    // update season/problem/topic/user => solved
    const seasonTopicproblemUser = this.prismaService.seasonTopicProblemUser.update({
      where: {
        seasonId_topicId_problemId_userId: {
          seasonId,
          topicId,
          problemId,
          userId,
        },
      },
      data: {
        solved: true,
      },
    })

    return seasonTopicproblemUser
  }

  async remove({ seasonId, topicId, problemId, userId }: SeasonTopicProblemUserId) {
    try {
      await this.prismaService.seasonTopicProblemUser.delete({
        where: {
          seasonId_topicId_problemId_userId: {
            seasonId,
            topicId,
            problemId,
            userId,
          },
        },
      })
    } catch (e) {
      console.log(`Fail to delete season topic user problem with id ${seasonId}`, ' : ', e)
      throw new Error(`Fail to delete season topic user problem with id ${seasonId}`)
    }
    return 1
  }
}
