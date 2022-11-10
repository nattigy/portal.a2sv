import { Injectable } from '@nestjs/common'
import { Field, InputType, Int } from '@nestjs/graphql'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSeasonTopicInput } from './dto/create-season-topic.input'
import { UpdateSeasonTopicInput } from './dto/update-season-topic.input'

@InputType()
export class SeasonTopicFilter {
  @Field(() => Int)
  skip?: number
  @Field(() => Int)
  take?: number
  @Field()
  seasonId?: string
  @Field()
  topicId?: string
}

@InputType()
export class SeasonTopicId {
  @Field()
  seasonId: string
  @Field()
  topicId: string
}

@Injectable()
export class SeasonTopicService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createSeasonTopicInput: CreateSeasonTopicInput) {
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

  findAll({ take, skip, topicId, seasonId }: SeasonTopicFilter) {
    return this.prismaService.seasonTopic.findMany({
      take,
      skip,
      where: {
        topicId,
        seasonId,
      },
    })
  }

  findOne({ seasonId, topicId }: SeasonTopicId) {
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

  update({ seasonId, topicId, problems, ...updates }: UpdateSeasonTopicInput) {
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
            problem: true
          }
        }
      }
    })
  }

  remove({ seasonId, topicId }: SeasonTopicId) {
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
