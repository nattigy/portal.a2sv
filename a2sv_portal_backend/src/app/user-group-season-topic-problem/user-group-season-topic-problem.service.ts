import { UpdateUserGroupSeasonTopicProblemInput } from './dto/update-user-group-season-topic-problem.input'
import { Injectable } from '@nestjs/common'
import { UserGroupSeasonTopicProblemRepository } from './user-group-season-topic-problem.repository'
import { PrismaService } from '../../prisma/prisma.service'
import { UserGroupSeasonTopicProblemId } from './dto/user-group-season-topic-problem-id.input'
import { UserGroupSeasonTopicProblem } from './entities/user-group-season-topic-problem.entity'

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

    // const today = new Date().toISOString();
    // if(updates.status === UserTopicProblemStatusEnum.SOLVED){
    //   // await this.prismaService.user
    //   await this.prismaService.userGroupSeasonDailyAnalytics.update({
    //     where:{
    //       userId_createdAt:{
    //         userId,
    //         createdAt: today
    //     }
    //     },
    //     data: {
    //       solvedCount:{
    //         increment: 1
    //       }
    //     }
    //   })
    // }else if(updates.status !== UserTopicProblemStatusEnum.NOT_SOLVED){
    //   this.prismaService.userGroupSeasonDailyAnalytics.update({
    //     where:{
    //       userId_createdAt:{
    //         userId,
    //         createdAt: today
    //     }
    //     },
    //     data: {
    //       wrongCount:{
    //         decrement: 1
    //       }
    //     }
    //   })
    // }
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
      data: { id, ...updates },
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
