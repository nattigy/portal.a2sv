import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateGroupSeasonInput, GroupSeasonId } from './dto/create-group-season.input'
import { GroupSeasonRepository } from './group-season.repository'
import { PrismaService } from '../../prisma/prisma.service'
import { GroupSeason } from './entities/group-season.entity'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterGroupSeasonInput } from './dto/filter-group-season.input'
import { JoinRequestEnum } from '@prisma/client'
import { UpdateGroupSeasonInput } from './dto/update-group-season.input'
import { PaginationGroupSeason } from '../../common/page/pagination-info'

@Injectable()
export class GroupSeasonService {
  constructor(
    private readonly groupSeasonRepository: GroupSeasonRepository,
    private readonly prismaService: PrismaService,
  ) {
  }

  async addSeasonToAGroup({ seasonId, groupId, startDate, endDate }: CreateGroupSeasonInput): Promise<GroupSeason> {
    const group = await this.prismaService.group.findUnique({ where: { id: groupId } })
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
      throw new Error('Group does not have an HoE, please assign head of education for the group first!')
    }
    if (groupSeasons.length > 0) {
      throw new Error('Group has other active seasons, please deactivate all seasons before creating a new one!')
    }
    return this.groupSeasonRepository.create({
      isActive: false,
      joinRequest: JoinRequestEnum.REQUESTED,
      startDate,
      endDate,
      headId: group.headId,
      head: { connect: { id: group.headId } },
      season: { connect: { id: seasonId } },
      group: { connect: { id: groupId } },
    })
  }

  async groupSeasonStat({ seasonId, groupId }: GroupSeasonId) {
    //generate state here
    return this.groupSeasonRepository.findOne({
      groupId_seasonId: { seasonId, groupId },
    })
  }

  async groupsSeasonsStats(
    filterGroupSeasonInput: FilterGroupSeasonInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationGroupSeason> {
    //generate multiple state here
    const count = await this.groupSeasonRepository.count(filterGroupSeasonInput)
    const groupSeasons = await this.groupSeasonRepository.findAll({
      where: filterGroupSeasonInput,
    })
    return {
      items: groupSeasons,
      pageInfo: { skip, count, take },
    }
  }

  async updateGroupSeason({ seasonId, groupId, ...updates }: UpdateGroupSeasonInput) {
    //generate multiple state here
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

  async updateJoinRequestGroupSeason({ seasonId, groupId, joinRequest }: UpdateGroupSeasonInput) {
    const groupSeason = await this.prismaService.groupSeason.findUnique({
      where: { groupId_seasonId: { groupId, seasonId } },
    })
    if (!groupSeason) {
      throw new Error('No group season found!')
    }
    return this.groupSeasonRepository.update({
      where: { groupId_seasonId: { seasonId, groupId } },
      data: { joinRequest },
    })
  }

  async removeGroupSeason({ seasonId, groupId }: GroupSeasonId) {
    return this.groupSeasonRepository.remove({
      groupId_seasonId: { seasonId, groupId },
    })
  }
}
