import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSeasonTopicProblemUserInput } from './dto/create-season-topic-problem-user.input'
import { SeasonTopicProblemUserId } from './dto/season-topic-problem-user.id'
import { UpdateSeasonTopicProblemUserInput } from './dto/update-season-topic-problem-user.input'
import { SeasonTopicProblemUser } from './entities/season-topic-problem-user.entity'
import { FilterSeasonTopicProblemUserInput } from './dto/filter-season-topic-problem-user.input'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { PaginationSeasonTopicProblemUser } from '../common/page/pagination-info'

@Injectable()
export class SeasonTopicProblemUserService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(
    createSeasonTopicProblemUserInput: CreateSeasonTopicProblemUserInput,
  ): Promise<SeasonTopicProblemUser> {
    return this.prismaService.seasonTopicProblemUser.create({
      data: createSeasonTopicProblemUserInput,
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

  async findAll(
    filterSeasonTopicProblemUserInput: FilterSeasonTopicProblemUserInput,
    { skip, take }: PaginationInfoInput = { take: 50, skip: 0 },
  ): Promise<PaginationSeasonTopicProblemUser> {
    const count = (
      await this.prismaService.seasonTopicProblemUser.findMany({
        where: filterSeasonTopicProblemUserInput,
      })
    ).length
    const seasonTopicProblemUsers: SeasonTopicProblemUser[] =
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

  async findOne({
                  seasonId,
                  topicId,
                  problemId,
                  userId,
                }: SeasonTopicProblemUserId): Promise<SeasonTopicProblemUser> {
    return this.prismaService.seasonTopicProblemUser.findUnique({
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
  }

  async update({
                 id,
                 ...updates
               }: UpdateSeasonTopicProblemUserInput): Promise<SeasonTopicProblemUser> {
    const { seasonId, problemId, userId, topicId } = id
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

  async remove({ seasonId, topicId, problemId, userId }: SeasonTopicProblemUserId) {
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
}
