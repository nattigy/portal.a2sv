import { Injectable } from '@nestjs/common'
import { UpdateUserGroupSeasonTopicProblemInput } from './dto/update-user-group-season-topic-problem.input'
import { UserGroupSeasonTopicProblemRepository } from './user-group-season-topic-problem.repository'
import { UserGroupSeasonTopicProblemId } from './dto/user-group-season-topic-problem-id.input'
import { UserGroupSeasonTopicProblem } from './entities/user-group-season-topic-problem.entity'
import { FilterUserGroupSeasonTopicProblemInput } from './dto/filter-user-group-season-topic-problem.input'

@Injectable()
export class UserGroupSeasonTopicProblemService {
  constructor(
    private readonly userGroupSeasonTopicProblemRepository: UserGroupSeasonTopicProblemRepository,
  ) {}

  async userGroupSeasonTopicProblem(
    userGroupSeasonTopicProblemId: UserGroupSeasonTopicProblemId,
  ): Promise<UserGroupSeasonTopicProblem> {
    return this.userGroupSeasonTopicProblemRepository.findOne({
      userId_groupId_seasonId_topicId_problemId: userGroupSeasonTopicProblemId,
    })
  }

  async userGroupSeasonTopicProblems(
    filterUserGroupSeasonTopicProblemInput: FilterUserGroupSeasonTopicProblemInput,
  ): Promise<UserGroupSeasonTopicProblem[]> {
    return this.userGroupSeasonTopicProblemRepository.findAll({
      where: filterUserGroupSeasonTopicProblemInput,
    })
  }

  async updateUserProblemStatus({ id, ...updates }: UpdateUserGroupSeasonTopicProblemInput) {
    if (updates.status) {
      updates.statusUpdatedAt = new Date()
    }
    return this.userGroupSeasonTopicProblemRepository.upsert({
      where: { userId_groupId_seasonId_topicId_problemId: id },
      data: { id, ...updates },
    })
  }

  async removeUserGroupSeasonTopicProblem(
    userGroupSeasonTopicProblemId: UserGroupSeasonTopicProblemId,
  ) {
    try {
      await this.userGroupSeasonTopicProblemRepository.remove({
        userId_groupId_seasonId_topicId_problemId: userGroupSeasonTopicProblemId,
      })
    } catch (e) {
      console.log(
        `Fail to delete season topic user problem with id ${userGroupSeasonTopicProblemId.seasonId}`,
        ' : ',
        e,
      )
      throw new Error(
        `Fail to delete season topic user problem with id ${userGroupSeasonTopicProblemId.seasonId}`,
      )
    }
    return 1
  }
}
