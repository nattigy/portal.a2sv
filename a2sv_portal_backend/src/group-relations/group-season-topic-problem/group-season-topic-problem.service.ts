import { Injectable, NotFoundException } from '@nestjs/common'
import {
  CreateGroupSeasonTopicProblemInput,
  GroupSeasonTopicProblemId,
} from './dto/create-group-season-topic-problem.input'
import { PrismaService } from '../../prisma/prisma.service'
import { GroupSeasonTopicProblemRepository } from './group-season-topic-problem.repository'
import { NotFoundError } from 'rxjs/internal/util/NotFoundError'

@Injectable()
export class GroupSeasonTopicProblemService {
  constructor(
    private readonly groupSeasonTopicProblemRepository: GroupSeasonTopicProblemRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async addProblemToGroupSeasonTopic({
    groupId,
    seasonId,
    topicId,
    problemId,
  }: CreateGroupSeasonTopicProblemInput) {
    // search for groupSeasonTopic first and if not found throw not found exception
    // if the groupSeasonTopic is found and the groupSeason is not active throw groupSeason not active
    // check if the problem exists and if it doesn't exist throw problem not found Error
    // upsert seasonTopicProblem

    const foundGroupSeasonTopic = await this.prismaService.groupSeasonTopic.findUnique({
      where: { groupId_seasonId_topicId: { groupId, seasonId, topicId } },
    })

    if (!foundGroupSeasonTopic)
      throw new NotFoundException(`Topic has not been added to this  Group's Season!`)

    const foundGroupSeason = await this.prismaService.groupSeason.findUnique({
      where: { groupId_seasonId: { groupId, seasonId } },
    })

    if (!foundGroupSeason.isActive) throw new Error(`Group Season is not Active!`)

    const foundProblem = await this.prismaService.problem.findUnique({
      where: { id: problemId },
    })

    if (!foundProblem)
      throw new NotFoundException(`Problem with id ${problemId} does not exist!`)

    await this.prismaService.seasonTopicProblem.upsert({
      where: {
        seasonId_topicId_problemId: {
          seasonId,
          topicId,
          problemId,
        },
      },
      create: {
        seasonTopic: {
          connect: {
            seasonId_topicId: { seasonId, topicId },
          },
        },
        problem: { connect: { id: problemId } },
      },
      update: {},
    })

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

  async removeGroupSeasonTopicProblem({
    groupId,
    seasonId,
    topicId,
    problemId,
  }: GroupSeasonTopicProblemId) {
    return this.groupSeasonTopicProblemRepository.remove({
      groupId_seasonId_topicId_problemId: { problemId, topicId, seasonId, groupId },
    })
  }
}
