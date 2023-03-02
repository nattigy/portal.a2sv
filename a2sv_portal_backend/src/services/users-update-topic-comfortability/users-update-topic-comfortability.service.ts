import { Injectable, NotFoundException } from '@nestjs/common'
import {
  UpdateUserGroupSeasonTopicInput,
} from '../../app/user-group-season-topic/dto/update-user-group-season-topic.input'
import { UserGroupSeasonTopic } from '../../app/user-group-season-topic/entities/user-group-season-topic.entity'
import { PrismaService } from '../../prisma/prisma.service'
import { UserGroupSeasonTopicService } from '../../app/user-group-season-topic/user-group-season-topic.service'

@Injectable()
export class UsersUpdateTopicComfortabilityService {
  constructor(
    private readonly userGroupSeasonTopicService: UserGroupSeasonTopicService,
    private readonly prismaService: PrismaService,
  ) {
  }

  async updateUserTopicComfortability({
                                        id,
                                        ...updates
                                      }: UpdateUserGroupSeasonTopicInput): Promise<UserGroupSeasonTopic> {
    /**
     1. Find user with userId and throw NotFoundException if doesn't exist
     check if user is in the same group as groupId provided if not throw "user not in the group" Error
     2. Get group from user, and search for GroupSeasonTopic if it doesn't exist,
     throw NotFoundException "topic hasn't been added to your group"
     3. Check if the groupSeason the user in is active if not throw "season is not active error"
     4. Upsert UserGroupSeason search for group and throw notFoundException if not found,
     search for season and throw notFoundException if not found,
     **/
    const { userId, topicId, groupId, seasonId } = id
    const group = await this.prismaService.group.findUnique({ where: { id: groupId } })
    const season = await this.prismaService.season.findUnique({ where: { id: seasonId } })
    if (!season) {
      throw new NotFoundException(`Season with id: ${seasonId} not found!`)
    }
    if (!group) {
      throw new NotFoundException(`Group with id: ${groupId} not found!`)
    }
    const foundUser = await this.prismaService.user.findUnique({ where: { id: userId } })
    if (!foundUser) throw new NotFoundException(`User with id ${userId} does not exist!`)

    if (foundUser.groupId !== groupId) throw new Error('User is not in this group!')

    const foundGroupSeasonTopic = await this.prismaService.groupSeasonTopic.findUnique({
      where: {
        groupId_seasonId_topicId: { groupId, seasonId, topicId },
      },
      include: { groupSeason: true },
    })
    if (!foundGroupSeasonTopic) throw new Error('Topic is not added to your group yet!')
    if (!foundGroupSeasonTopic.groupSeason.isActive)
      throw new Error('This group\'s season is not active!')

    return this.userGroupSeasonTopicService.updateUserGroupSeasonTopic({
      comfortLevel: updates.comfortLevel, id,
    })
  }
}
