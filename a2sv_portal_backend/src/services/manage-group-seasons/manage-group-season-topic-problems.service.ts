import { Injectable, NotFoundException } from '@nestjs/common'
import {
  CreateGroupSeasonTopicProblemInput,
  GroupSeasonTopicProblemId,
} from '../../app/group-season-topic-problem/dto/create-group-season-topic-problem.input'
import { PrismaService } from '../../prisma/prisma.service'
import { GroupSeasonTopicProblemRepository } from '../../app/group-season-topic-problem/group-season-topic-problem.repository'
import { SeasonTopicProblemRepository } from '../../app/season-topic-problem/season-topic-problem.repository'
import { SeasonTopicRepository } from '../../app/season-topic/season-topic.repository'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterGroupSeasonTopicProblemInput } from '../../app/group-season-topic-problem/dto/filter-group-season-topic'

@Injectable()
export class ManageGroupSeasonTopicProblemsService {
  constructor(
    private readonly groupSeasonTopicProblemRepository: GroupSeasonTopicProblemRepository,
    private readonly seasonTopicProblemRepository: SeasonTopicProblemRepository,
    private readonly seasonTopicRepository: SeasonTopicRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async addProblemToGroupSeasonTopic({
    groupId,
    seasonId,
    topicId,
    problemId,
  }: CreateGroupSeasonTopicProblemInput) {
    /** search for groupSeasonTopic first and if not found throw not found exception
     if the groupSeasonTopic is found and the groupSeason is not active throw groupSeason not active
     check if the problem exists and if it doesn't exist throw problem not found Error
     upsert seasonTopicProblem
     **/

    const foundGroupSeasonTopic = await this.prismaService.groupSeasonTopic.findUnique({
      where: { groupId_seasonId_topicId: { groupId, seasonId, topicId } },
    })

    if (!foundGroupSeasonTopic)
      throw new NotFoundException(`Topic has not been added to this  Group's Season!`)

    const foundGroupSeason = await this.prismaService.groupSeason.findUnique({
      where: { groupId_seasonId: { groupId, seasonId } },
    })

    if (!foundGroupSeason.isActive) throw new Error(`Group Season is not Active!`)

    const group = await this.prismaService.group.findUnique({
      where: { id: groupId },
    })

    const season = await this.prismaService.season.findUnique({
      where: { id: seasonId },
    })

    const topic = await this.prismaService.topic.findUnique({
      where: { id: topicId },
    })

    if (!group) throw new NotFoundException(`Group with id ${groupId} does not exist!`)

    if (!season) throw new NotFoundException(`Season with id ${seasonId} does not exist!`)

    if (!topic) throw new NotFoundException(`Season with id ${topicId} does not exist!`)

    const foundProblem = await this.prismaService.problem.findUnique({
      where: { id: problemId },
    })

    if (!foundProblem)
      throw new NotFoundException(`Problem with id ${problemId} does not exist!`)
    return this.groupSeasonTopicProblemRepository.upsert({
      where: {
        groupId_seasonId_topicId_problemId: {
          seasonId,
          topicId,
          problemId,
          groupId,
        },
      },
      data: {},
    })
  }

  async groupSeasonTopicProblem(groupSeasonTopicProblemId: GroupSeasonTopicProblemId) {
    const gSTP = await this.groupSeasonTopicProblemRepository.findOne({
      groupId_seasonId_topicId_problemId: groupSeasonTopicProblemId,
    })
    if (!gSTP) {
      throw new NotFoundException('Problem not added to this group under this season!')
    }
    return gSTP
  }

  async groupSeasonTopicProblems(
    { groupId, seasonId, topicId, problemId }: FilterGroupSeasonTopicProblemInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ) {
    return this.groupSeasonTopicProblemRepository.findAll({
      skip,
      take,
      where: { groupId, seasonId, topicId, problemId },
    })
  }

  async removeGroupSeasonTopicProblem(groupSeasonTopicProblemId: GroupSeasonTopicProblemId) {
    return this.groupSeasonTopicProblemRepository.remove({
      groupId_seasonId_topicId_problemId: groupSeasonTopicProblemId,
    })
  }
}
