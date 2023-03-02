import { Injectable } from '@nestjs/common'
import { UserGroupSeasonTopicRepository } from './user-group-season-topic.repository'
import { UpdateUserGroupSeasonTopicInput } from './dto/update-user-group-season-topic.input'
import { UserGroupSeasonTopic } from './entities/user-group-season-topic.entity'
import { UserGroupSeasonTopicId } from './dto/create-user-group-season-topic.input'

@Injectable()
export class UserGroupSeasonTopicService {
  constructor(
    private readonly userGroupSeasonTopicRepository: UserGroupSeasonTopicRepository,
  ) {
  }

  async updateUserGroupSeasonTopic({ id, ...updates }: UpdateUserGroupSeasonTopicInput): Promise<UserGroupSeasonTopic> {
    return this.userGroupSeasonTopicRepository.upsert({
      where: {
        userId_groupId_seasonId_topicId: id,
      },
      data: { id, ...updates },
    })
  }

  async removeUserGroupSeasonTopic(userGroupSeasonTopicId: UserGroupSeasonTopicId) {
    try {
      await this.userGroupSeasonTopicRepository.remove({
        userId_groupId_seasonId_topicId: userGroupSeasonTopicId,
      })
    } catch (e) {
      console.log(`Fail to delete user topic with id ${userGroupSeasonTopicId.userId}`, ' : ', e)
      throw new Error(`Fail to delete user topic with id ${userGroupSeasonTopicId.userId}`)
    }
    return 1
  }
}
