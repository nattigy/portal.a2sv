import { Injectable } from '@nestjs/common'
import { CreateSeasonTopicInput } from './dto/create-season-topic.input'
import { UpdateSeasonTopicInput } from './dto/update-season-topic.input'
import { PrismaService } from '../prisma.service'
import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class SeasonTopicFilter {
  @Field(() => Int, { nullable: true })
  skip?: number
  @Field(() => Int, { nullable: true })
  take?: number
  @Field({ nullable: true })
  seasonId?: string
  @Field({ nullable: true })
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
      include: {
        season: true,
        topic: true,
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
            data: problems,
          },
        },
      },
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
