import { Injectable } from '@nestjs/common'
import { UserGroupSeasonTopicRepository } from './user-group-season-topic.repository'
import { PrismaService } from '../../prisma/prisma.service'
import { UpdateUserGroupSeasonTopicInput } from './dto/update-user-group-season-topic.input'
import { UserGroupSeasonTopic } from './entities/user-group-season-topic.entity'
import { UserGroupSeasonTopicId } from './dto/create-user-group-season-topic.input'

@Injectable()
export class UserGroupSeasonTopicService {
  constructor(
    private readonly userGroupSeasonTopicRepository: UserGroupSeasonTopicRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async updateUserTopicComfortability({
    id,
    ...updates
  }: UpdateUserGroupSeasonTopicInput): Promise<UserGroupSeasonTopic> {
    const { userId, groupId, seasonId, topicId } = id
    return this.userGroupSeasonTopicRepository.upsert({
      where: {
        userId_groupId_seasonId_topicId: { userId, groupId, seasonId, topicId },
      },
      data: {
        comfortLevel: updates.comfortLevel,
      },
    })
  }

  async removeUserGroupSeasonTopic({
    userId,
    groupId,
    seasonId,
    topicId,
  }: UserGroupSeasonTopicId) {
    try {
      await this.userGroupSeasonTopicRepository.remove({
        userId_groupId_seasonId_topicId: { userId, groupId, seasonId, topicId },
      })
    } catch (e) {
      console.log(`Fail to delete user topic with id ${userId}`, ' : ', e)
      throw new Error(`Fail to delete user topic with id ${userId}`)
    }
    return 1
  }
}
