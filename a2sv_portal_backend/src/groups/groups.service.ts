import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateGroupInput } from './dto/create-group.input'
import { Group } from '@prisma/client'

@Injectable()
export class GroupsService {
  constructor(private readonly prismaService: PrismaService) {}

  findOneById(id: number): Promise<Group> {
    const group = this.prismaService.group.findUnique({ where: { id: id } })
    return group
  }

  create(group: CreateGroupInput): Promise<Group> {
    return this.prismaService.group.create({ data: group })
  }
}
