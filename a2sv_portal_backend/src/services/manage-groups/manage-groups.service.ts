import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateGroupInput } from '../../app/group/dto/create-group.input'
import { Group } from '../../app/group/entities/group.entity'
import { Prisma } from '@prisma/client'
import { GroupService } from '../../app/group/group.service'
import { UpdateGroupInput } from '../../app/group/dto/update-group.input'
import { PrismaService } from '../../prisma/prisma.service'
import { GroupRepository } from '../../app/group/group.repository'

@Injectable()
export class ManageGroupsService {
  constructor(
    private readonly groupService: GroupService,
    private readonly groupRepository: GroupRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async createGroup({ headId, ...createGroupInput }: CreateGroupInput): Promise<Group> {
    /** if headId is in the create input check if the user with the headId exists
     if not return user not found if the user is there check if the user has been assigned
     to another group
     */
    const createData: Prisma.GroupCreateInput = { ...createGroupInput }
    if (headId) {
      const foundUser = await this.prismaService.user.findUnique({
        where: { id: headId },
        include: { headToGroup: true },
      })
      if (!foundUser) {
        throw new NotFoundException(`User with id ${headId} does not exist!`)
      }
      if (foundUser.headToGroup) {
        throw new Error(`User with id ${headId} is already assigned to another group!`)
      }
      createData.head = { connect: { id: headId } }
    }
    return this.groupRepository.create({
      ...createData,
    })
  }

  async updateGroup({ groupId, headId, ...updates }: UpdateGroupInput): Promise<Group> {
    // check if group with this Id exists and if it doesn't return
    // "group with this Id doesn't" exists error
    const foundGroup = await this.prismaService.group.findUnique({ where: { id: groupId } })
    if (!foundGroup) {
      throw new NotFoundException(`Group with id ${groupId} not found`)
    }

    if (headId) {
      const foundUser = await this.prismaService.user.findUnique({
        where: { id: headId },
      })
      if (!foundUser) {
        throw new NotFoundException(`User with id ${headId} does not exist!`)
      }
      // if there are active season on the group the head on that active season should also change
      const groupSeason = await this.prismaService.groupSeason.findFirst({
        where: { groupId, isActive: true },
      })
      if (groupSeason) {
        const { groupId, seasonId } = groupSeason
        await this.prismaService.groupSeasonHead.upsert({
          where: {
            groupId_seasonId_headId: {
              groupId,
              seasonId,
              headId: foundUser.id,
            },
          },
          create: { groupId, seasonId, headId: foundUser.id },
          update: {},
        })
      }
      await this.groupRepository.update({
        where: { id: groupId },
        data: { head: { connect: { id: headId } } },
      })
    }
    return this.groupService.updateGroup({
      groupId,
      headId,
      ...updates,
    })
  }
}
