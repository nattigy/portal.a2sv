import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSeasonTopicProblemInput } from './dto/create-season-topic-problem.input'
import { UpdateSeasonTopicProblemInput } from './dto/update-season-topic-problem.input'
import { SeasonTopicProblem } from './entities/season-topic-problem.entity'
import { PaginationSeasonTopicProblem } from '../common/page/pagination-info'
import { PaginationInput } from '../common/page/pagination.input'
import { SeasonTopicProblemId } from '../season-topic/dto/filter-season-topic.input'
import { SeasonTopicProblemFilter } from './dto/filter-season-topic-problem'

@Injectable()
export class SeasonTopicProblemService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createSeasonTopicProblemInput: CreateSeasonTopicProblemInput,
  ): Promise<SeasonTopicProblem> {
    return this.prismaService.seasonTopicProblem.create({
      include: {
        problem: true,
        seasonTopic: true,
      },
      data: createSeasonTopicProblemInput,
    })
  }

  async findAll(
    seasonTopicProblemFilter: SeasonTopicProblemFilter,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationSeasonTopicProblem> {
    const count = (
      await this.prismaService.seasonTopicProblem.findMany({
        where: seasonTopicProblemFilter,
      })
    ).length
    const seasonTopicProblems: SeasonTopicProblem[] =
      await this.prismaService.seasonTopicProblem.findMany({
        where: seasonTopicProblemFilter,
        include: {
          problem: true,
          seasonTopic: {
            include: {
              season: {
                include: {
                  group: {
                    include: {
                      users: true,
                    },
                  },
                },
              },
            },
          },
        },
      })
    return {
      items: seasonTopicProblems,
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
  }: SeasonTopicProblemId): Promise<SeasonTopicProblem> {
    return this.prismaService.seasonTopicProblem.findUnique({
      where: {
        seasonId_topicId_problemId: {
          seasonId,
          topicId,
          problemId,
        },
      },
      include: {
        problem: true,
        seasonTopic: true,
      },
    })
  }

  async update({
    seasonId,
    topicId,
    problemId,
    ...updates
  }: UpdateSeasonTopicProblemInput): Promise<SeasonTopicProblem> {
    return this.prismaService.seasonTopicProblem.update({
      where: {
        seasonId_topicId_problemId: {
          seasonId,
          topicId,
          problemId,
        },
      },
      data: updates,
      include: {
        problem: true,
        seasonTopic: true,
      },
    })
  }

  async remove({ seasonId, problemId, topicId }: SeasonTopicProblemId) {
    try {
      await this.prismaService.seasonTopicProblem.delete({
        where: {
          seasonId_topicId_problemId: {
            seasonId,
            problemId,
            topicId,
          },
        },
      })
    } catch (e) {
      console.log(`Fail to delete season topic problem with id ${seasonId}`, ' : ', e)
      throw new Error(`Fail to delete season topic problem with id ${seasonId}`)
    }
    return 1
  }
}
