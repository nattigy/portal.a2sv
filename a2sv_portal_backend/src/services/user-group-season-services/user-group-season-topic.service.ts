import { Injectable } from '@nestjs/common'
import { UserGroupSeasonTopicId } from '../../app/user-group-season-topic/dto/create-user-group-season-topic.input'
import { PrismaService } from '../../prisma/prisma.service'
import { UserGroupSeasonTopic } from '../../app/user-group-season-topic/entities/user-group-season-topic.entity'
import { PaginationInput } from '../../common/page/pagination.input'
import {
  FilterUserGroupSeasonTopicInput,
} from '../../app/user-group-season-topic/dto/filter-user-group-season-topic-input'
import { PaginationUserGroupSeasonTopic } from '../../common/page/pagination-info'
import { UserGroupSeasonTopicRepository } from '../../app/user-group-season-topic/user-group-season-topic.repository'
import { UserGroupSeasonTopicProblemService } from './user-group-season-topic-problem.service'
import { GroupSeasonTopicRepository } from '../../app/group-season-topic/group-season-topic.repository'
import { ComfortLevelEnum, UserTopicProblemStatusEnum } from '@prisma/client'
import { GroupSeasonTopic } from '../../app/group-season-topic/entities/group-season-topic.entity'
import {
  UserGroupSeasonTopicProblemRepository,
} from '../../app/user-group-season-topic-problem/user-group-season-topic-problem.repository'
import { UserGroupSeasonRepository } from '../../app/user-group-season/user-group-season.repository'

@Injectable()
export class UserGroupSeasonTopicService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userGroupSeasonRepository: UserGroupSeasonRepository,
    private readonly userGroupSeasonTopicRepository: UserGroupSeasonTopicRepository,
    private readonly userGroupSeasonTopicProblemRepository: UserGroupSeasonTopicProblemRepository,
    private readonly groupSeasonTopicRepository: GroupSeasonTopicRepository,
    private readonly userGroupSeasonTopicProblemService: UserGroupSeasonTopicProblemService,
  ) {
  }

  async userGroupSeasonTopic({
                               userId,
                               groupId,
                               seasonId,
                               topicId,
                             }: UserGroupSeasonTopicId): Promise<UserGroupSeasonTopic> {
    let userGroupSeasonTopic = await this.userGroupSeasonTopicRepository.findOne({
      userId_groupId_seasonId_topicId: { userId, groupId, seasonId, topicId },
    })
    const userGroupSeasonTopicProblems =
      await this.userGroupSeasonTopicProblemService.userGroupSeasonTopicProblems({
        userId,
        groupId,
        seasonId,
        topicId,
      })
    if (userGroupSeasonTopic === undefined || userGroupSeasonTopic === null) {
      const groupSeasonTopic = await this.groupSeasonTopicRepository.findOne({
        groupId_seasonId_topicId: {
          groupId,
          seasonId,
          topicId,
        },
      })
      const totalSubmissions = userGroupSeasonTopicProblems.items.map(
        p => p.numberOfAttempts,
      ).reduce((a, b) => a + b, 0)
      const totalAcceptedSubmissions = userGroupSeasonTopicProblems.items.filter(
        p => p.status === UserTopicProblemStatusEnum.SOLVED,
      ).length
      userGroupSeasonTopic = {
        seasonId,
        groupId,
        topicId,
        userId,
        comfortLevel: ComfortLevelEnum.UNCOMFORTABLE,
        totalSubmissions,
        totalAcceptedSubmissions,
        comfortabilityPercentage:
          userGroupSeasonTopicProblems.items.length > 0 ?
            (totalAcceptedSubmissions / userGroupSeasonTopicProblems.items.length) * 100 : 0.0,
        topic: groupSeasonTopic.topic,
        userGroupSeasonTopicProblems: [],
      }
    }
    userGroupSeasonTopic.userGroupSeasonTopicProblems = userGroupSeasonTopicProblems.items
    return userGroupSeasonTopic
  }

  async userGroupSeasonTopics(
    { ...filterUserGroupSeasonTopicInput }: FilterUserGroupSeasonTopicInput,
    { take, skip }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserGroupSeasonTopic> {
    // mapping with groupSeasonTopics
    /** The final goal of this function is to return the list of all problems
     * under a certain topic, for certain groups, under a certain season, for certain students
     * The problem with this is, we don't create data on the database for each user and list of problems
     * that are added to their group under a season, so we need to create these data and do the mapping accordingly
     * I tried to write the steps clearly below.
     * **/
    const { groupId, seasonId, userId, topicId } = filterUserGroupSeasonTopicInput
    const count = await this.userGroupSeasonTopicRepository.count(
      filterUserGroupSeasonTopicInput,
    )
    const users = await this.prismaService.user.findMany({
      where: { groupId, id: userId },
    })
    const userGroupSeasonTopics: UserGroupSeasonTopic[] =
      await this.userGroupSeasonTopicRepository.findAll({
        skip,
        take,
        where: filterUserGroupSeasonTopicInput,
      })
    const userGroupSeasonTopicProblems =
      await this.userGroupSeasonTopicProblemService.userGroupSeasonTopicProblems({
        userId, groupId, seasonId, topicId,
      })
    /** groupSeasonTopics is needed to do the mapping this groupSeasonTopic is not going to be created for all users**/
    const groupSeasonTopics: GroupSeasonTopic[] =
      await this.groupSeasonTopicRepository.findAll({
        skip,
        take,
        where: { groupId, seasonId },
      })
    const result: UserGroupSeasonTopic[] = []
    /** here we make sure that the data we are returning is unique, per user, group, season, and topic **/
    const mappedUGSTs: { ['key']?: UserGroupSeasonTopic } = {}
    for (const userGroupSeasonTopic of userGroupSeasonTopics) {
      /** add the list of problems for each unique UserGroupSeasonTopic **/
      /** on this step we only add data that already exists on the database **/
      /** Data only exists on the database if a student fills their status whether it, topic comfortability,
       * or problem solved status.
       * **/
      mappedUGSTs[
        `${userGroupSeasonTopic.userId}${userGroupSeasonTopic.groupId}${userGroupSeasonTopic.seasonId}${userGroupSeasonTopic.topicId}`
        ] = {
        ...userGroupSeasonTopic,
        userGroupSeasonTopicProblems: userGroupSeasonTopicProblems.items.filter(
          u =>
            u.userId === userGroupSeasonTopic.userId &&
            u.groupId === userGroupSeasonTopic.groupId &&
            u.seasonId === userGroupSeasonTopic.seasonId &&
            u.topicId === userGroupSeasonTopic.topicId,
        ),
      }
    }
    for (const groupSeasonTopic of groupSeasonTopics) {
      for (const user of users) {
        /** On this step we create data on the fly with their default value, for topic which the user didn't fill their status,
         * here we fill them with their default data
         * **/
        const check =
          mappedUGSTs[
            `${user.id}${groupSeasonTopic.groupId}${groupSeasonTopic.seasonId}${groupSeasonTopic.topicId}`
            ]
        if (check) {
          /** Currently we are not storing stat related info on the database for each user
           * So, on this step we have to make sure that, the stats are calculated
           * **/
          /// TODO: make sure that the stats are calculated here
          const solved = check.userGroupSeasonTopicProblems.filter(
              p => p.status === UserTopicProblemStatusEnum.SOLVED,
            ).length
          const totalSubmissions = check.userGroupSeasonTopicProblems.map(
            p => p.numberOfAttempts,
          ).reduce((a, b) => a + b, 0)
          result.push({
            ...check,
            totalAcceptedSubmissions: solved,
            totalSubmissions,
            comfortabilityPercentage: check.userGroupSeasonTopicProblems.length > 0 ? (solved / check.userGroupSeasonTopicProblems.length) * 100 : 0.0,
          })
        } else {
          if (user.groupId) {
            const userProblems = userGroupSeasonTopicProblems.items.filter(
              u =>
                u.userId === user.id &&
                u.groupId === user.groupId &&
                u.seasonId === groupSeasonTopic.seasonId &&
                u.topicId === groupSeasonTopic.topicId,
            )
            const solved = userProblems.filter(
              p => p.status === UserTopicProblemStatusEnum.SOLVED,
            ).length
            const totalSubmissions = userProblems.map(
              p => p.numberOfAttempts,
            ).reduce((a, b) => a + b, 0)
            result.push({
              seasonId: groupSeasonTopic.seasonId,
              userId: user.id,
              groupId: user.groupId,
              topicId: groupSeasonTopic.topicId,
              comfortLevel: ComfortLevelEnum.UNCOMFORTABLE,
              totalAcceptedSubmissions: solved,
              totalSubmissions,
              comfortabilityPercentage: userProblems.length > 0 ? (solved / userProblems.length) * 100 : 0.0,
              topic: groupSeasonTopic.topic,
              userGroupSeasonTopicProblems: userProblems,
            })
          }
        }
      }
    }
    return {
      items: result,
      pageInfo: { skip, take, count },
    }
  }
}
