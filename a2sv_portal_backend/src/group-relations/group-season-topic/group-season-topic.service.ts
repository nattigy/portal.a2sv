import { Injectable } from '@nestjs/common'
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
    return this.groupSeasonTopicRepository.create({
      groupId,
      seasonId,
      topicId,
      seasonTopic: { connect: { seasonId_topicId: { topicId, seasonId } } },
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
