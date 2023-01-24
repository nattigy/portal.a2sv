import { Injectable } from '@nestjs/common'
import { UserGroupSeasonTopicRepository } from './user-group-season-topic.repository'
import { PrismaService } from '../../prisma/prisma.service'
import { UpdateUserGroupSeasonTopicInput } from './dto/update-user-group-season-topic.input'
import { UserGroupSeasonTopic } from './entities/user-group-season-topic.entity'

@Injectable()
export class UserGroupSeasonTopicService {
  constructor(
    private readonly userGroupSeasonTopicRepository: UserGroupSeasonTopicRepository,
    private readonly prismaService: PrismaService,
  ) {
  }

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
}
