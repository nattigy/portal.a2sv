import { Injectable, NotFoundException } from '@nestjs/common'
import { PaginationTopic } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateTopicInput } from './dto/create-topic.input'
import { UpdateTopicInput } from './dto/update-topic.input'
import { FilterTopicInput } from './dto/filter-topic-input'
import { TopicRepository } from './topic.repository'
import { Topic } from './entities/topic.entity'

@Injectable()
export class TopicService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly topicRepository: TopicRepository,
  ) {}

  async create({ name, description }: CreateTopicInput): Promise<Topic> {
    // TODO: check if topic with this name already exists and if it does return
    // TODO: "topic with this name already" exists error

    const foundTopic = await this.topicRepository.findOne({ name })

    if (foundTopic) throw new Error('Topic with this name already exists!')

    return this.topicRepository.create({
      name,
      description,
    }) 
  }

  async topics(
    filterTopicInput: FilterTopicInput,
    { take, skip }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationTopic> {
    const count = await this.topicRepository.count(filterTopicInput)
    const topics = await this.topicRepository.findAll({
      skip,
      take,
      where: filterTopicInput,
    })
    return {
      items: topics,
      pageInfo: { skip, take, count },
    }
  }

  async topic(topicId: string): Promise<Topic> {
    const topic = await this.topicRepository.findOne({ id: topicId })
    if (!topic) {
      throw new NotFoundException(`Topic with id ${topicId} not found!`)
    }
    return topic
  }

  async updateTopic({ topicId, ...update }: UpdateTopicInput): Promise<Topic> {
    // TODO: check if topic with this Id exists and if it doesn't return
    // TODO: "topic with this Id doesn't" exists error
    const foundTopic = await this.topicRepository.findOne({ id: topicId })

    if (!foundTopic) {
      throw new NotFoundException(`Topic with id ${topicId} does not exist!`)
    }

    if (update.name) {
      const topic = await this.topicRepository.findOne({ name: update.name })
      if (topic && topic.id !== foundTopic.id)
        throw new Error('Topic with this name already exists!')
    }

    return this.topicRepository.update({
      where: { id: topicId },
      data: update,
    })
  }

  async removeTopic(id: string): Promise<number> {
    try {
      await this.topicRepository.remove({ id })
    } catch (e) {
      throw new Error(`Fail to delete topic with id ${id}`)
    }
    return 1
  }
}
