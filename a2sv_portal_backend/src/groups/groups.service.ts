import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateGroupInput } from './dto/create-group.input'
import { Group } from '../groups/entities/group.entity'
import { UpdateGroupInput } from './dto/update-group.input'
import { RoleEnum } from '@prisma/client'

@Injectable()
export class GroupsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createGroup(createGroupInput: CreateGroupInput): Promise<Group> {
    return this.prismaService.group.create({
      include: {
        topics: {
          include: {
            group: true,
            topic: true,
          },
        },
      },
      data: createGroupInput,
    })
  }

  async getGroupById(id: number): Promise<Group> {
    const group = await this.prismaService.group.findUnique({
      include: {
        topics: {
          include: {
            group: true,
            topic: true,
          },
        },
      },
      where: { id },
    })
    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`)
    }
    return group
  }

  async getGroups(): Promise<Group[]> {
    console.log("I'm Here")
    return this.prismaService.group.findMany({
      include: {
        topics: true,
      },
    })
  }

  async updateGroup(updateGroupInput: UpdateGroupInput): Promise<Group> {
    console.log("I'm here in update group")
    const { topics, users, ...groupData } = updateGroupInput
    if (users) {
      this.prismaService.group.update({
        where: { id: updateGroupInput.id },
        data: {
          users: {
            connect: users,
          },
        },
      })
    }
    if (topics) {
      topics.map((topic) => {
        this.prismaService.group.update({
          where: { id: updateGroupInput.id },
          data: {
            topics: {
              connectOrCreate: {
                where: {
                  groupId_topicId: {
                    groupId: updateGroupInput.id,
                    topicId: topic.id,
                  },
                },
                create: {
                  topic: {
                    connect: {
                      id: topic.id,
                    },
                  },
                },
              },
            },
          },
        })
      })
    }
    return this.prismaService.group.update({
      where: { id: updateGroupInput.id },
      data: groupData,
      include: {
        topics: true,
        users: true,
      },
    })
  }

  async deleteGroup(id: number): Promise<Group> {
    return this.prismaService.group.delete({
      where: { id },
    })
  }
}
