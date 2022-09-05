import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { Topic } from '@prisma/client'
import { CreateTopicInput } from './dto/create-topic.input'
import { UpdateTopicInput } from './dto/update-topic.input'

@Injectable()
export class TopicService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTopics(): Promise<Topic[]> {
    return this.prismaService.topic.findMany({ include: { season: true } })
  }

  async getTopicById(id: number): Promise<Topic> {
    const topic = await this.prismaService.topic.findUnique({
      where: { id: id },
      include: {
        season: true,
      },
    })
    if (!topic) {
      throw new NotFoundException(`Topic with id ${id} not found`)
    }
    return topic
  }

  async createTopic(createTopicInput: CreateTopicInput): Promise<Topic> {
    const { season, ...data } = createTopicInput
    return await this.prismaService.topic.create({
      data: {
        ...data,
        season: {
          connectOrCreate: {
            where: {
              name: season.name,
            },
            create: {
              ...season,
            },
          },
        },
      },
      include: {
        season: true,
      },
    })
  }

  async updateTopic(
    givenId: number,
    updateTopicInput: UpdateTopicInput,
  ): Promise<Topic> {
    const { id, season, ...data } = updateTopicInput
    return this.prismaService.topic.update({
      where: { id: id },
      data: data,
      include: {
        season: true,
      },
    })
  }

  async deleteTopic(id: number): Promise<Topic> {
    return this.prismaService.topic.delete({ where: { id } })
  }
}
