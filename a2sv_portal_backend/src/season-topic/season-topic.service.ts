import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSeasonTopicInput } from './dto/create-season-topic.input'
import { UpdateSeasonTopicInput } from './dto/update-season-topic.input'
import { FilterSeasonTopicInput } from './dto/filter-season-topic.input'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { SeasonTopic } from '@prisma/client'
import { PaginationSeasonTopic } from '../common/page/pagination-info'

@Injectable()
export class SeasonTopicService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSeasonTopicInput: CreateSeasonTopicInput): Promise<SeasonTopic> {
    return this.prismaService.seasonTopic.create({
      data: createSeasonTopicInput,
      include: {
        topic: true,
        season: true,
        problems: {
          include: {
            problem: true,
          },
        },
      },
    })
  }

  async findAll(
    filterSeasonTopicInput: FilterSeasonTopicInput,
    { skip, take }: PaginationInfoInput = { take: 50, skip: 0 },
  ): Promise<PaginationSeasonTopic> {
    const count = (
      await this.prismaService.seasonTopic.findMany({
        where: filterSeasonTopicInput,
        select: {
          seasonId: true,
        },
      })
    ).length
    const seasonTopics: SeasonTopic[] = await this.prismaService.seasonTopic.findMany({
      take,
      skip,
      where: filterSeasonTopicInput,
      include: {
        season: true,
        topic: true,
        problems: true,
      },
    })

    return {
      items: seasonTopics,
      pageInfo: {
        take,
        skip,
        count,
      },
    }
  }

  async findOne(seasonId, topicId): Promise<SeasonTopic> {
    return this.prismaService.seasonTopic.findUnique({
      where: {
        seasonId_topicId: {
          seasonId,
          topicId,
        },
      },
      include: {
        season: true,
        topic: true,
        problems: {
          include: {
            problem: true,
          },
        },
      },
    })
  }

  async update({
    seasonId,
    topicId,
    problems,
    ...updates
  }: UpdateSeasonTopicInput): Promise<SeasonTopic> {
    return this.prismaService.seasonTopic.update({
      where: {
        seasonId_topicId: {
          seasonId,
          topicId,
        },
      },
      data: {
        ...updates,
        problems: {
          createMany: {
            skipDuplicates: true,
            data: problems.map(({ problemId }) => ({
              problemId,
            })),
          },
        },
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    })
  }

  async remove(seasonId, topicId) {
    return this.prismaService.seasonTopic.delete({
      where: {
        seasonId_topicId: {
          seasonId,
          topicId,
        },
      },
    })
  }
}
