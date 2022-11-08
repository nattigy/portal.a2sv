import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateSeasonTopicProblemUserInput } from './dto/create-season-topic-problem-user.input'
import { SeasonTopicProblemUserFilter } from './dto/season-topic-problem-user.filter'
import { SeasonTopicProblemUserId } from './dto/season-topic-problem-user.id'
import { UpdateSeasonTopicProblemUserInput } from './dto/update-season-topic-problem-user.input'

@Injectable()
export class SeasonTopicProblemUserService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createSeasonTopicProblemUserInput: CreateSeasonTopicProblemUserInput) {
    return this.prismaService.seasonTopicProblemUser.create({
      data: createSeasonTopicProblemUserInput,
    })
  }

  findAll(seasonTopicProblemUserFilter: SeasonTopicProblemUserFilter) {
    return this.prismaService.seasonTopicProblemUser.findMany({
      where: seasonTopicProblemUserFilter,
    })
  }

  findOne({ seasonId, topicId, problemId, userId }: SeasonTopicProblemUserId) {
    return this.prismaService.seasonTopicProblemUser.findUnique({
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

  update({ id, ...updates }: UpdateSeasonTopicProblemUserInput) {
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
    })
  }

  remove({ seasonId, topicId, problemId, userId }: SeasonTopicProblemUserId) {
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
