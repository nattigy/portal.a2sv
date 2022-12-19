import { Injectable, NotFoundException } from '@nestjs/common'
import {
  CreateGroupSeasonTopicInput,
  GroupSeasonTopicId,
} from '../../app/group-season-topic/dto/create-group-season-topic.input'
import { PrismaService } from '../../prisma/prisma.service'
import { GroupSeasonTopicRepository } from '../../app/group-season-topic/group-season-topic.repository'
import { FilterGroupSeasonTopicInput } from '../../app/group-season-topic/dto/filter-group-season-topic.input'
import { PaginationInput } from '../../common/page/pagination.input'
import { SeasonTopicRepository } from '../../app/season-topic/season-topic.repository'

@Injectable()
export class GroupSeasonTopicService {
  constructor(
    private readonly groupSeasonTopicRepository: GroupSeasonTopicRepository,
    private readonly seasonTopicRepository: SeasonTopicRepository,
    private readonly prismaService: PrismaService,
  ) {
  }

  async addTopicToGroupSeason({ groupId, seasonId, topicId }: CreateGroupSeasonTopicInput) {
    // search for groupSeason if groupSeason not found throw groupSeason not found exception
    // if there is a groupSeason and if the groupSeason is in active throw "group season must be active"
    // search for the topic and if the topic is not found return topic not found exception
    // if seasonTopic not found add it else leave it as it is (use upsert for this)

    const foundGroupSeason = await this.prismaService.groupSeason.findUnique({
      where: { groupId_seasonId: { groupId, seasonId } },
    })

    if (!foundGroupSeason)
      throw new NotFoundException(`Group has not been added to this Season!`)

    if (!foundGroupSeason.isActive) throw new Error(`Group Season is not Active!`)

    const foundTopic = await this.prismaService.topic.findUnique({
      where: { id: topicId },
    })

    if (!foundTopic) throw new NotFoundException(`Topic with id ${topicId} does not exist!`)

    await this.seasonTopicRepository.upsert({
      where: { seasonId_topicId: { seasonId, topicId } },
      data: {},
    })

    return this.groupSeasonTopicRepository.upsert({
      where: {
        groupId_seasonId_topicId: { groupId, seasonId, topicId },
      },
      data: {},
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
