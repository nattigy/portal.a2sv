import { Injectable } from '@nestjs/common'
import {
  CreateGroupSeasonTopicProblemInput,
  GroupSeasonTopicProblemId,
} from './dto/create-group-season-topic-problem.input'
import { PrismaService } from '../../prisma/prisma.service'
import { GroupSeasonTopicProblemRepository } from './group-season-topic-problem.repository'

@Injectable()
export class GroupSeasonTopicProblemService {
  constructor(
    private readonly groupSeasonTopicProblemRepository: GroupSeasonTopicProblemRepository,
    private readonly prismaService: PrismaService,
  ) {
  }

  async addProblemToGroupSeasonTopic(
    { groupId, seasonId, topicId, problemId }: CreateGroupSeasonTopicProblemInput,
  ) {
    // TODO: search for groupSeasonTopic first and if not found throw not found exception
    // TODO: if the groupSeasonTopic is found and the groupSeason is not active throw groupSeason not active
    // TODO: search for the seasonTopicProblem and if the seasonTopicProblem is not found
    // TODO: upsert seasonTopicProblem
    return this.groupSeasonTopicProblemRepository.create({
      seasonTopicProblem: {
        connect: { seasonId_topicId_problemId: { seasonId, topicId, problemId } },
      },
      groupSeasonTopic: {
        connect: { groupId_seasonId_topicId: { topicId, seasonId, groupId } },
      },
      problem: { connect: { id: problemId } },
    })
  }

  // async groupSeasonTopicProblem({
  //   groupId,
  //   seasonId,
  //   topicId,
  //   problemId,
  // }: GroupSeasonTopicProblemId) {
  //   return this.groupSeasonTopicProblemRepository.findOne({
  //     groupId_seasonId_topicId_problemId: {
  //       problemId,
  //       topicId,
  //       seasonId,
  //       groupId,
  //     },
  //   })
  // }
  //
  // async groupSeasonTopicProblems(
  //   { groupId, seasonId, topicId, problemId }: FilterGroupSeasonTopicProblemInput,
  //   { skip, take }: PaginationInput = { take: 50, skip: 0 },
  // ) {
  //   return this.groupSeasonTopicProblemRepository.findAll({
  //     skip,
  //     take,
  //     where: { groupId, seasonId, topicId, problemId },
  //   })
  // }

  async removeGroupSeasonTopicProblem(
    { groupId, seasonId, topicId, problemId }: GroupSeasonTopicProblemId,
  ) {
    return this.groupSeasonTopicProblemRepository.remove({
      groupId_seasonId_topicId_problemId: { problemId, topicId, seasonId, groupId },
    })
  }
}
