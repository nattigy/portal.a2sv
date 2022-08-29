import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateGroupInput } from './dto/create-group.input'
import { Group } from '@prisma/client'
import { UpdateGroupInput } from './dto/update-group.input'

@Injectable()
export class GroupsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createGroup(createGroupInput: CreateGroupInput): Promise<Group> {
    return this.prismaService.group.create({
      data: createGroupInput,
    })
  }

  async getGroupById(id: number): Promise<Group> {
    const group = await this.prismaService.group.findUnique({
      where: { id },
    })
    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`)
    }
    return group
  }

  async getGroups(): Promise<Group[]> {
    return this.prismaService.group.findMany()
  }

  async updateGroup(
    id: number,
    updateGroupInput: UpdateGroupInput,
  ): Promise<Group> {
    return this.prismaService.group.update({
      where: { id },
      data: updateGroupInput,
    })
  }

  async deleteGroup(id: number): Promise<Group> {
    return this.prismaService.group.delete({
      where: { id },
    })
  }
}
