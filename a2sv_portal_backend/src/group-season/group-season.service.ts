import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateGroupSeasonInput, GroupSeasonId } from './dto/create-group-season.input'
import { GroupSeasonRepository } from './group-season.repository'
import { PrismaService } from '../prisma/prisma.service'
import { GroupSeason } from './entities/group-season.entity'

@Injectable()
export class GroupSeasonService {
  constructor(
    private readonly groupSeasonRepository: GroupSeasonRepository,
    private readonly prismaService: PrismaService,
  ) {
  }

  async addSeasonToAGroup({ seasonId, groupId }: CreateGroupSeasonInput): Promise<GroupSeason> {
    const group = await this.prismaService.group.findUnique({ where: { id: groupId } })
    const season = await this.prismaService.season.findUnique({ where: { id: seasonId } })
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
    return this.groupSeasonRepository.create({
      isActive: true,
      headId: group.headId,
      season: {
        connect: {
          id: seasonId,
        },
      },
      group: {
        connect: {
          id: groupId,
        },
      },
    })
  }

  async groupSeasonStat(groupSeasonId: GroupSeasonId) {
    return `This action returns a #${groupSeasonId} groupSeason`
  }

  async groupSeasonOverAllStat(groupId: string) {
    return `This action returns a #${groupId} groupSeason`
  }

  async removeGroupSeason({ seasonId, groupId }: GroupSeasonId) {
    return this.groupSeasonRepository.remove({
      groupId_seasonId: { seasonId, groupId },
    })
  }
}
