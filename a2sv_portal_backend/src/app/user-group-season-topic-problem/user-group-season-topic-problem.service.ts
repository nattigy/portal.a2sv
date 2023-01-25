import { UpdateUserGroupSeasonTopicProblemInput } from './dto/update-user-group-season-topic-problem.input'
import { Injectable, NotFoundException } from '@nestjs/common'
import { UserGroupSeasonTopicProblemRepository } from './user-group-season-topic-problem.repository'
import { PrismaService } from '../../prisma/prisma.service'
import { UserGroupSeasonTopicProblemId } from './dto/user-group-season-topic-problem-id.input'
import { UserGroupSeasonTopicProblem } from './entities/user-group-season-topic-problem.entity'
import { GroupSeasonTopicProblem } from '../group-season-topic-problem/entities/group-season-topic-problem.entity'
import { UserTopicProblemStatusEnum } from '@prisma/client'

@Injectable()
export class UserGroupSeasonTopicProblemService {
  constructor(
    private readonly userGroupSeasonTopicProblemRepository: UserGroupSeasonTopicProblemRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async userGroupSeasonTopicProblem({
    seasonId,
    groupId,
    topicId,
    problemId,
    userId,
  }: UserGroupSeasonTopicProblemId): Promise<UserGroupSeasonTopicProblem> {
    return this.userGroupSeasonTopicProblemRepository.findOne({
      userId_groupId_seasonId_topicId_problemId: {
        seasonId,
        groupId,
        topicId,
        problemId,
        userId,
      },
    })
  }

  async updateUserProblemStatus({ id, ...updates }: UpdateUserGroupSeasonTopicProblemInput) {
    const { userId, groupId, seasonId, topicId, problemId } = id

    return this.userGroupSeasonTopicProblemRepository.upsert({
      where: {
        userId_groupId_seasonId_topicId_problemId: {
          seasonId,
          topicId,
          groupId,
          problemId,
          userId,
        },
      },
      data: updates,
    })
  }

  async removeUserGroupSeasonTopicProblem({
    seasonId,
    topicId,
    problemId,
    userId,
    groupId,
  }: UserGroupSeasonTopicProblemId) {
    try {
      await this.userGroupSeasonTopicProblemRepository.remove({
        userId_groupId_seasonId_topicId_problemId: {
          seasonId,
          groupId,
          topicId,
          problemId,
          userId,
        },
      })
    } catch (e) {
      console.log(`Fail to delete season topic user problem with id ${seasonId}`, ' : ', e)
      throw new Error(`Fail to delete season topic user problem with id ${seasonId}`)
    }
    return 1
  }
}
