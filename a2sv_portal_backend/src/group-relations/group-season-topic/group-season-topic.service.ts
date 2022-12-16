import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateGroupSeasonTopicInput, GroupSeasonTopicId } from './dto/create-group-season-topic.input'
import { PrismaService } from '../../prisma/prisma.service'
import { GroupSeasonTopicRepository } from './group-season-topic.repository'
import { FilterGroupSeasonTopicInput } from './dto/filter-group-season-topic.input'
import { PaginationInput } from '../../common/page/pagination.input'

@Injectable()
export class GroupSeasonTopicService {
  constructor(
    private readonly groupSeasonTopicRepository: GroupSeasonTopicRepository,
    private readonly prismaService: PrismaService,
  ) {
  }

  async addTopicToGroupSeason({ groupId, seasonId, topicId }: CreateGroupSeasonTopicInput) {
    // TODO: search for groupSeason if groupSeason not found throw groupSeason not found exception
    // TODO: if there is a groupSeason and if the groupSeason is in active throw "group season must be active"
    // TODO: search for the topic and if the topic is not found return topic not found exception
    // TODO: if seasonTopic not found throw "topic hasn't been added to the season"
    const seasonTopic = await this.prismaService.seasonTopic.findUnique({
      where: { seasonId_topicId: { seasonId, topicId } },
    })
    if (!seasonTopic) {
      throw new NotFoundException('Topic hasn\'t been added to the season yet!')
    }
    return this.groupSeasonTopicRepository.create({
      groupSeason: { connect: { groupId_seasonId: { groupId, seasonId } } },
      seasonTopic: { connect: { seasonId_topicId: { topicId, seasonId } } },
      topic: { connect: { id: topicId } },
    })
  }

  async groupSeasonTopic({ groupId, seasonId, topicId }: GroupSeasonTopicId) {
    return this.groupSeasonTopicRepository.findOne({
      groupId_seasonId_topicId: { topicId, seasonId, groupId },
    })
  }

  async groupSeasonTopics(
    filterGroupSeasonTopicInput: FilterGroupSeasonTopicInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ) {
    return this.groupSeasonTopicRepository.findAll({
      skip,
      take,
      where: filterGroupSeasonTopicInput,
    })
  }

  async removeGroupSeasonTopic({ groupId, seasonId, topicId }: GroupSeasonTopicId) {
    return this.groupSeasonTopicRepository.remove({
      groupId_seasonId_topicId: { topicId, seasonId, groupId },
    })
  }
}
