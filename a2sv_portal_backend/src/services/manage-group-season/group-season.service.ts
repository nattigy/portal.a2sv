import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateGroupSeasonInput, GroupSeasonId } from '../../app/group-season/dto/create-group-season.input'
import { GroupSeasonRepository } from '../../app/group-season/group-season.repository'
import { PrismaService } from '../../prisma/prisma.service'
import { GroupSeason } from '../../app/group-season/entities/group-season.entity'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterGroupSeasonInput } from '../../app/group-season/dto/filter-group-season.input'
import { JoinRequestEnum } from '@prisma/client'
import {
  UpdateGroupSeasonInput,
  UpdateGroupSeasonJoinRequestInput,
} from '../../app/group-season/dto/update-group-season.input'
import { PaginationGroupSeason } from '../../common/page/pagination-info'

@Injectable()
export class GroupSeasonService {
  constructor(
    private readonly groupSeasonRepository: GroupSeasonRepository,
    private readonly prismaService: PrismaService,
  ) {
  }

  async addGroupToASeason({
                            seasonId,
                            groupId,
                          }: CreateGroupSeasonInput): Promise<GroupSeason> {
    const group = await this.prismaService.group.findUnique({
      where: { id: groupId },
      include: { groupHeads: { include: { user: true } } },
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
    if (!group.groupHeads) {
      throw new Error(
        'Group does not have an HoE, please assign head of education for the group first!',
      )
    }
    if (groupSeasons.length > 0) {
      throw new Error(
        'Group has other active seasons, please deactivate all seasons before requesting a new one!',
      )
    }
    const groupSeason = await this.groupSeasonRepository.create({
      isActive: false,
      joinRequest: JoinRequestEnum.REQUESTED,
      startDate: season.startDate,
      endDate: season.endDate,
      season: { connect: { id: seasonId } },
      group: { connect: { id: groupId } },
    })
    // await this.prismaService.groupSeasonHead.upsert({
    //   where: {
    //     groupId_seasonId_headId: {
    //       groupId: group.id, seasonId, headId,
    //     }
    //   },
    //   create: {
    //     groupId: group.id, seasonId, headId
    //   },
    //   update: {}
    // })
    return groupSeason
  }

  async groupSeason({ seasonId, groupId }: GroupSeasonId) {
    // TODO: generate state here
    return this.groupSeasonRepository.findOne({
      groupId_seasonId: { seasonId, groupId },
    })
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
