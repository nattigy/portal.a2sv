import { UpdateUserGroupSeasonTopicProblemInput } from './dto/update-user-group-season-topic-problem.input'
import { Injectable, NotFoundException } from '@nestjs/common'
import { UserGroupSeasonTopicProblemRepository } from './user-group-season-topic-problem.repository'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class UserGroupSeasonTopicProblemService {
  constructor(
    private readonly userGroupSeasonTopicProblemRepository: UserGroupSeasonTopicProblemRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async updateUserProblemStatus({ id, ...updates }: UpdateUserGroupSeasonTopicProblemInput) {
    // search for problem and throw notFoundException if not found,
    // search for GroupSeasonTopicProblem from the groupId if not found,
    // throw NotFoundException "problem under this topic hasn't been added to your group yet!"
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
}
