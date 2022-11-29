import { Injectable, NotFoundException } from '@nestjs/common'
import { Topic } from '@prisma/client'
import { PaginationTopic } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { PrismaService } from '../prisma/prisma.service'
import { AddTopicToSeasonInput } from './dto/add-topic-to-season-input'
import { CreateTopicInput } from './dto/create-topic.input'
import { UpdateTopicInput } from './dto/update-topic.input'
import { FilterTopicInput } from './dto/filter-topic-input'

@Injectable()
export class TopicService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    filterTopicInput: FilterTopicInput,
    { take, skip }: PaginationInfoInput = { take: 50, skip: 0 },
  ): Promise<PaginationTopic> {
    const topicsCount = (
      await this.prismaService.topic.findMany({
        where: filterTopicInput,
        select: {
          id: true,
        },
      })
    ).length
    const topics = await this.prismaService.topic.findMany({
      skip,
      take,
      where: filterTopicInput,
      include: {
        seasons: {
          include: {
            problems: {
              include: {
                problem: true,
              },
            },
          },
        },
      },
    })
    return {
      items: topics,
      pageInfo: {
        skip,
        take,
        count: topicsCount,
      },
    }
  }

  async findOne(id: string): Promise<Topic> {
    const topic = await this.prismaService.topic.findUnique({
      where: { id: id },
      include: {
        seasons: {
          include: {
            topic: true,
            problems: {
              include: {
                problem: true,
              },
            },
          },
        },
      },
    })
    if (!topic) {
      throw new NotFoundException(`Topic with id ${id} not found`)
    }
    return topic
  }

  async create(createTopicInput: CreateTopicInput): Promise<Topic> {
    // const { ...data } = createTopicInput
    // const queryData = data as any
    return this.prismaService.topic.create({
      data: createTopicInput,

      include: {
        seasons: {
          include: {
            problems: {
              include: {
                problem: true,
              },
            },
          },
        },
      },
    })
  }

  async update(givenId: string, updateTopicInput: UpdateTopicInput): Promise<Topic> {
    const { id, ...data } = updateTopicInput
    const queryData = data as any
    return this.prismaService.topic.update({
      where: { id: id },
      data: queryData,
      include: {
        seasons: {
          include: {
            problems: {
              include: {
                problem: true,
              },
            },
          },
        },
      },
    })
  }

  async addTopicToSeason(addTopicToSeasonInput: AddTopicToSeasonInput) {
    return this.prismaService.season.update({
      data: {
        seasonTopics: {
          create: {
            topic: {
              connect: {
                id: addTopicToSeasonInput.topicId,
              },
            },
          },
        },
      },
      where: {
        id: addTopicToSeasonInput.seasonId,
      },
    })
  }

  async remove(id: string): Promise<number> {
    try {
      await this.prismaService.topic.delete({ where: { id } })
    } catch (e) {
      console.log(`Fail to delete topic with id ${id}`, ' : ', e)
      throw new Error(`Fail to delete topic with id ${id}`)
    }
    return 1
  }
}
