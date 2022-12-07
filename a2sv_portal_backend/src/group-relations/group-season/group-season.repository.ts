import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { GroupSeason } from './entities/group-season.entity'

@Injectable()
export class GroupSeasonRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(data: Prisma.GroupSeasonCreateInput | Prisma.GroupSeasonUncheckedCreateInput): Promise<GroupSeason> {
    return this.prismaService.groupSeason.create({
      data,
      include: { group: true, season: true, head: true },
    })
  }

  async count(where?: Prisma.GroupSeasonWhereInput): Promise<number> {
    return this.prismaService.groupSeason.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.GroupSeasonWhereInput
    orderBy?: Prisma.GroupSeasonOrderByWithRelationInput
  }): Promise<GroupSeason[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.groupSeason.findMany({
      skip, take, where, orderBy,
      include: { group: true, season: true, head: true },
    })
  }

  async findOne(where: Prisma.GroupSeasonWhereUniqueInput): Promise<GroupSeason> {
    return this.prismaService.groupSeason.findUnique({
      where,
      include: { group: true, season: true, head: true },
    })
  }

  async update(params: {
    where: Prisma.GroupSeasonWhereUniqueInput
    data: Prisma.GroupSeasonUpdateInput
  }): Promise<GroupSeason> {
    const { where, data } = params
    return this.prismaService.groupSeason.update({
      data,
      where,
      include: { group: true, season: true, head: true },
    })
  }

  async remove(where: Prisma.GroupSeasonWhereUniqueInput) {
    return this.prismaService.groupSeason.delete({where})
  }
}
