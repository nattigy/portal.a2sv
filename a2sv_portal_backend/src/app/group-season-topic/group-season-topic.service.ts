import { Injectable } from '@nestjs/common'
import { UserTopicProblemStatusEnum } from '@prisma/client'
import { GroupSeasonTopicRepository } from './group-season-topic.repository'
import { PrismaService } from '../../prisma/prisma.service'
import { GroupSeasonTopicId } from './dto/create-group-season-topic.input'
import { FilterGroupSeasonTopicInput } from './dto/filter-group-season-topic.input'
import { PaginationInput } from '../../common/page/pagination.input'

@Injectable()
export class GroupSeasonTopicService {
  constructor(
    private readonly groupSeasonTopicRepository: GroupSeasonTopicRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async groupSeasonTopic({ groupId, seasonId, topicId }: GroupSeasonTopicId) {
    const groupTopic = await this.groupSeasonTopicRepository.findOne({
      groupId_seasonId_topicId: { topicId, seasonId, groupId },
    })
    groupTopic.numberOfProblems = groupTopic.groupSeasonTopicProblems.length
    groupTopic.comfortability =
      groupTopic.numberOfProblems > 0
        ? (groupTopic.groupSeasonTopicProblems
            .map(p => p.userGroupSeasonTopicProblems)
            .flat(1)
            .filter(up => up.status === UserTopicProblemStatusEnum.SOLVED).length /
            groupTopic.numberOfProblems) *
          100
        : 0.0
    return groupTopic
  }

  async groupSeasonTopics(
    filterGroupSeasonTopicInput: FilterGroupSeasonTopicInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ) {
    const groupTopics = await this.groupSeasonTopicRepository.findAll({
      skip,
      take,
      where: filterGroupSeasonTopicInput,
    })
    groupTopics.map(groupTopic => {
      groupTopic.numberOfProblems = groupTopic.groupSeasonTopicProblems.length
      groupTopic.comfortability =
        groupTopic.numberOfProblems > 0
          ? (groupTopic.groupSeasonTopicProblems
              .map(p => p.userGroupSeasonTopicProblems)
              .flat(1)
              .filter(up => up.status === UserTopicProblemStatusEnum.SOLVED).length /
              groupTopic.numberOfProblems) *
            100
          : 0.0
      return groupTopic
    })
    return groupTopics
  }

  async upsert({ groupId, seasonId, topicId }: GroupSeasonTopicId) {
    return this.groupSeasonTopicRepository.upsert({
      where: { groupId_seasonId_topicId: { groupId, seasonId, topicId } },
      data: {},
    })
  }

  async removeGroupSeasonTopic({ groupId, seasonId, topicId }: GroupSeasonTopicId) {
    return this.groupSeasonTopicRepository.remove({
      groupId_seasonId_topicId: { topicId, seasonId, groupId },
    })
  }
}
