import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateGroupInput } from './dto/create-group.input'
import { Group } from '../groups/entities/group.entity'
import { UpdateGroupInput } from './dto/update-group.input'

@Injectable()
export class GroupsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createGroup(createGroupInput: CreateGroupInput): Promise<Group> {
    return this.prismaService.group.create({
      include: {
        topics: {
          include: {
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
        topics: {
          include: {
            topic: true,
          },
        },
      },
    })
  }

  async updateGroup(updateGroupInput: UpdateGroupInput): Promise<Group> {
    const { topics, users, ...groupData } = updateGroupInput
    const queryData = groupData as any
    if (users) {
      queryData.users = {
        connect: users,
      }
    }
    if (topics) {
      queryData.topics = {
        connectOrCreate: topics.map((topic) => {
          return {
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
          }
        }),
      }
    }

    return this.prismaService.group.update({
      where: { id: updateGroupInput.id },
      data: groupData,
      include: {
        topics: {
          include: {
            topic: true,
          },
        },
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
