import { Injectable } from '@nestjs/common'
import {
  CreateGroupSeasonTopicProblemInput,
  GroupSeasonTopicProblemId,
} from './dto/create-group-season-topic-problem.input'
import { UpdateGroupSeasonTopicProblemInput } from './dto/update-group-season-topic-problem.input'
import { PrismaService } from '../../prisma/prisma.service'
import { GroupSeasonTopicProblemRepository } from './group-season-topic-problem.repository'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterGroupSeasonTopicProblemInput } from './dto/filter-group-season-topic'

@Injectable()
export class GroupSeasonTopicProblemService {
  constructor(
    private readonly groupSeasonTopicProblemRepository: GroupSeasonTopicProblemRepository,
    private readonly prismaService: PrismaService,
  ) {
  }

  async addProblemToGroupSeasonTopic({ groupId, seasonId, topicId, problemId }: CreateGroupSeasonTopicProblemInput) {
    return this.groupSeasonTopicProblemRepository.create({
      groupId, seasonId, topicId, problemId,
      groupSeasonTopic: {
        connect: { seasonId_topicId_groupId: { topicId, seasonId, groupId } },
      },
      problem: { connect: { id: problemId } },
    })
  }

  async groupSeasonTopicProblem({ groupId, seasonId, topicId, problemId }: GroupSeasonTopicProblemId) {
    return this.groupSeasonTopicProblemRepository.findOne({
      seasonId_topicId_groupId_problemId: {
        problemId, topicId, seasonId, groupId,
      },
    })
  }

  async groupSeasonTopicProblems(
    { groupId, seasonId, topicId, problemId }: FilterGroupSeasonTopicProblemInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ) {
    return this.groupSeasonTopicProblemRepository.findAll({
      skip, take,
      where: { groupId, seasonId, topicId, problemId },
    })
  }

  async updateGroupSeasonTopicProblem(
    { groupId, seasonId, topicId, problemId }: UpdateGroupSeasonTopicProblemInput,
  ) {
    return this.groupSeasonTopicProblemRepository.update({
      where: {
        seasonId_topicId_groupId_problemId: {
          problemId, topicId, seasonId, groupId,
        },
      },
    })
  }

  async removeGroupSeasonTopicProblem({ groupId, seasonId, topicId, problemId }: GroupSeasonTopicProblemId) {
    return this.groupSeasonTopicProblemRepository.remove({
      seasonId_topicId_groupId_problemId: {
        problemId, topicId, seasonId, groupId,
      },
    })
  }
}
