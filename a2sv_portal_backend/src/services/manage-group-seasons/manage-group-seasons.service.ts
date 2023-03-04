import { Injectable, NotFoundException } from '@nestjs/common'
import {
  CreateGroupSeasonInput,
  GroupSeasonId,
} from '../../app/group-season/dto/create-group-season.input'
import { GroupSeasonRepository } from '../../app/group-season/group-season.repository'
import { PrismaService } from '../../prisma/prisma.service'
import { GroupSeason } from '../../app/group-season/entities/group-season.entity'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterGroupSeasonInput } from '../../app/group-season/dto/filter-group-season.input'
import {
  JoinRequestEnum,
  ProblemDifficultyTypeEnum,
  UserTopicProblemStatusEnum,
} from '@prisma/client'
import {
  UpdateGroupSeasonInput,
  UpdateGroupSeasonJoinRequestInput,
} from '../../app/group-season/dto/update-group-season.input'
import { PaginationGroupSeason } from '../../common/page/pagination-info'

@Injectable()
export class ManageGroupSeasonsService {
  constructor(
    private readonly groupSeasonRepository: GroupSeasonRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async addGroupToASeason({
    seasonId,
    groupId,
  }: CreateGroupSeasonInput): Promise<GroupSeason> {
    const group = await this.prismaService.group.findUnique({
      where: { id: groupId },
    })
    const season = await this.prismaService.season.findUnique({ where: { id: seasonId } })
    const groupSeasons = await this.prismaService.groupSeason.findMany({
      where: { groupId, isActive: true },
    })
    if (!season) {
      throw new NotFoundException(`Season with id: ${seasonId} not found!`)
    }
    if (!group) {
      throw new NotFoundException(`Group with id: ${groupId} not found!`)
    }
    if (!season.isActive) {
      throw new Error('Season not active!')
    }
    if (!group.headId) {
      throw new NotFoundException(`Group please assign group head first!`)
    }
    if (groupSeasons.length > 0) {
      throw new Error(
        'Group has other active seasons, please deactivate all seasons before requesting a new one!',
      )
    }
    return this.groupSeasonRepository.create({
      isActive: false,
      joinRequest: JoinRequestEnum.REQUESTED,
      startDate: season.startDate,
      endDate: season.endDate,
      season: { connect: { id: seasonId } },
      group: { connect: { id: groupId } },
      groupSeasonHeads: {
        connectOrCreate: {
          where: {
            groupId_seasonId_headId: {
              groupId,
              seasonId,
              headId: group.headId,
            },
          },
          create: { user: { connect: { id: group.headId } } },
        },
      },
    })
  }

  async groupSeason({ seasonId, groupId }: GroupSeasonId) {
    // TODO: generate state here
    const gs = await this.groupSeasonRepository.findOne({
      groupId_seasonId: { seasonId, groupId },
    })
    const calc = this.calculateGroupSeasonStat(gs)
    return { ...gs, ...calc }
  }

  calculateGroupSeasonStat(gs) {
    // user topic problems
    const utp = gs.groupSeasonTopics
      .map(t => t.groupSeasonTopicProblems)
      .flat(1)
      .map(t => t.userGroupSeasonTopicProblems)
      .flat(1)
    const utpSolved = utp.filter(t => t.status === UserTopicProblemStatusEnum.SOLVED)
    gs.numberOfStudents = gs.userGroupSeasons.length
    const totalSubmissions = utp.map(t => t.numberOfAttempts).reduce((a, b) => a + b, 0)
    const totalAcceptedSubmissions = utpSolved.length
    gs.totalSubmissions = totalSubmissions
    // gs.totalAcceptedSubmissions = 100
    gs.totalAcceptedSubmissions = totalAcceptedSubmissions
    gs.acceptanceRate = totalSubmissions
      ? (totalAcceptedSubmissions / totalSubmissions) * 100
      : 0
    gs.easyCount = utpSolved.filter(
      p => p.problem.difficulty === ProblemDifficultyTypeEnum.EASY,
    ).length
    gs.mediumCount = utpSolved.filter(
      p => p.problem.difficulty === ProblemDifficultyTypeEnum.MEDIUM,
    ).length
    gs.hardCount = utpSolved.filter(
      p => p.problem.difficulty === ProblemDifficultyTypeEnum.HARD,
    ).length
    // gs.averageContestRating = gs.
    // gs.totalContestsAttended = gs.
    return gs
  }

  async groupsSeasons(
    filterGroupSeasonInput: FilterGroupSeasonInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationGroupSeason> {
    // TODO: generate multiple state here
    const count = await this.groupSeasonRepository.count(filterGroupSeasonInput)
    const groupSeasons = await this.groupSeasonRepository.findAll({
      where: filterGroupSeasonInput,
    })
    for (let i = 0; i < groupSeasons.length; i++) {
      const calc = this.calculateGroupSeasonStat(groupSeasons[i])
      groupSeasons[i] = { ...groupSeasons[i], ...calc }
    }
    return {
      items: groupSeasons,
      pageInfo: { skip, count, take },
    }
  }

  async updateGroupSeason({ seasonId, groupId, ...updates }: UpdateGroupSeasonInput) {
    const groupSeason = await this.prismaService.groupSeason.findUnique({
      where: { groupId_seasonId: { groupId, seasonId } },
    })
    if (!groupSeason) {
      throw new Error('No group season found!')
    }
    if (groupSeason.joinRequest !== JoinRequestEnum.APPROVED) {
      throw new Error('You must get approval from the HoA to make updates!')
    }
    if (updates.isActive) {
      // when a groupSeason is active it will first make all other seasons on this group inactive
      await this.prismaService.groupSeason.updateMany({
        where: { groupId },
        data: { isActive: false },
      })
    }
    return this.groupSeasonRepository.update({
      where: { groupId_seasonId: { seasonId, groupId } },
      data: updates,
    })
  }

  async updateGroupSeasonJoinRequest({
    seasonId,
    groupId,
    joinRequest,
  }: UpdateGroupSeasonJoinRequestInput) {
    const groupSeason = await this.prismaService.groupSeason.findUnique({
      where: { groupId_seasonId: { groupId, seasonId } },
      include: { season: true },
    })
    if (!groupSeason) {
      throw new Error('No group season found!')
    }
    if (!groupSeason.season.isActive) {
      throw new Error('Season not active!')
    }
    // If the join request status is Rejected the groupSeason isActive should be false
    return this.groupSeasonRepository.update({
      where: { groupId_seasonId: { seasonId, groupId } },
      data: {
        joinRequest,
        isActive: joinRequest === JoinRequestEnum.REJECTED ? false : groupSeason.isActive,
      },
    })
  }

  async removeGroupFromASeason({ seasonId, groupId }: GroupSeasonId) {
    return this.groupSeasonRepository.remove({
      groupId_seasonId: { seasonId, groupId },
    })
  }
}
