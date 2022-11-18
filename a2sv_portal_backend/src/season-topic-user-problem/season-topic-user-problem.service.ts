import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { SeasonTopicProblemUserId } from './dto/season-topic-problem-user.id'
import { UpdateSeasonTopicProblemUserInput } from './dto/update-season-topic-problem-user.input'
import { SeasonTopicUserProblem } from './entities/season-topic-user-problem.entity'
import { FilterSeasonTopicUserProblemInput } from './dto/filter-season-topic-user-problem.input'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { PaginationSeasonTopicProblemUser } from '../common/page/pagination-info'
import { SeasonTopicProblem } from '../season-topic-problem/entities/season-topic-problem.entity'
import { User } from '../user/entities/user.entity'


@Injectable()
export class SeasonTopicUserProblemService {
  constructor(private readonly prismaService: PrismaService) {}

  // async create(
  //   createSeasonTopicProblemUserInput: CreateSeasonTopicProblemUserInput,
  // ): Promise<SeasonTopicUserProblem> {
  //   return this.prismaService.seasonTopicProblemUser.create({
  //     data: createSeasonTopicProblemUserInput,
  //     include: {
  //       seasonTopicProblem: {
  //         include: {
  //           seasonTopic: true,
  //           problem: true,
  //         },
  //       },
  //       user: true,
  //     },
  //   })
  // }

  async findOne({
    seasonId,
    topicId,
    problemId,
    userId,
  }: SeasonTopicProblemUserId): Promise<SeasonTopicUserProblem> {
    const seasonTopicUserProblem: SeasonTopicUserProblem =
      await this.prismaService.seasonTopicProblemUser.findUnique({
        where: {
          seasonId_topicId_problemId_userId: {
            seasonId,
            topicId,
            problemId,
            userId,
          },
        },
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
    if (seasonTopicUserProblem === null || seasonTopicUserProblem === undefined) {
      const user = await this.prismaService.user.findUnique({ where: { id: userId } })
      const seasonTopicProblem = await this.prismaService.seasonTopicProblem.findUnique({
        where: {
          seasonId_topicId_problemId: {
            seasonId,
            topicId,
            problemId,
          },
        },
        include: {
          seasonTopic: true,
          problem: true,
        },
      })
      return {
        seasonId,
        userId,
        problemId,
        topicId,
        attempts: 0,
        needHelp: false,
        solved: false,
        solutionLink: '',
        timeDedicated: 0,
        seasonTopicProblem,
        user,
      }
    }
    return seasonTopicUserProblem
  }

  async findAll(
    filterSeasonTopicProblemUserInput: FilterSeasonTopicUserProblemInput,
    { skip, take }: PaginationInfoInput = { take: 50, skip: 0 },
  ): Promise<PaginationSeasonTopicProblemUser> {
    const count = (
      await this.prismaService.seasonTopicProblemUser.findMany({
        where: filterSeasonTopicProblemUserInput,
      })
    ).length
    const seasonTopicProblemUsers: SeasonTopicUserProblem[] =
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
    { skip, take }: PaginationInfoInput = { take: 50, skip: 0 },
  ): Promise<PaginationSeasonTopicProblemUser> {
    const count = 0
    const seasonTopicUserProblems: SeasonTopicUserProblem[] = []
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
      const seasonTopicUserProblem: SeasonTopicUserProblem = await this.findOne({
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
    { skip, take }: PaginationInfoInput = { take: 50, skip: 0 },
  ): Promise<PaginationSeasonTopicProblemUser> {
    const count = (
      await this.prismaService.user.findMany({
        where: {
          groupId,
        },
      })
    ).length
    const seasonTopicUserProblems: SeasonTopicUserProblem[] = []
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
        const seasonTopicUserProblem: SeasonTopicUserProblem = await this.findOne({
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
  }: UpdateSeasonTopicProblemUserInput): Promise<SeasonTopicUserProblem> {
    const { seasonId, problemId, userId, topicId } = id
    if (updates.solved){
      await  this.prismaService.userAnalytics.update({
        where:{
          userId_createdAt:{
            userId,
            createdAt:new Date()
          }
         },
        data:{
          count:{
            increment:1
          }
        }
      })
    }
    console.log("===status ==updated")
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

  async remove({ seasonId, topicId, problemId, userId}: SeasonTopicProblemUserId) {
    return this.prismaService.seasonTopicProblemUser.delete({
      where: {
        seasonId_topicId_problemId_userId: {
          seasonId,
          topicId,
          problemId,
          userId,
        },
      },
    })
  }

  async problemSolved({ seasonId, topicId, problemId, userId }: SeasonTopicProblemUserId){
    //update season/problem/topic/user => solved
    const seasonTopicproblemUser = this.prismaService.seasonTopicProblemUser.update({
      where:{
        seasonId_topicId_problemId_userId: {
          seasonId,
          topicId,
          problemId,
          userId,
        }
      },
      data:{
        solved:true
      }
    })

    
    return seasonTopicproblemUser
  }
}

