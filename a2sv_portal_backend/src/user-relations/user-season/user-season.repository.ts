import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserSeason } from './entities/user-season.entity'

@Injectable()
export class UserSeasonRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(data: Prisma.UserSeasonCreateInput ): Promise<UserSeason> {
    return this.prismaService.userSeason.create({
      data,
      include: {
        user: true,
        season: true,
      },
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    groupId?: string
    where?: Prisma.UserSeasonWhereInput
    orderBy?: Prisma.UserSeasonOrderByWithRelationInput
  }): Promise<UserSeason[]> {
    const { skip, take, where, groupId, orderBy } = params
    return this.prismaService.userSeason.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        user: { where: { groupId } },
        season: true,
      },
    })
  }

  async findOne(where: Prisma.UserSeasonWhereUniqueInput): Promise<UserSeason> {
    return this.prismaService.userSeason.findUnique({
      where,
      include: {
        user: true,
        season: true,
      },
    })
  }

  async update(params: {
    where: Prisma.UserSeasonWhereUniqueInput
    data: Prisma.UserSeasonUpdateInput
  }): Promise<UserSeason> {
    const { where, data } = params
    return this.prismaService.userSeason.update({
      data,
      where,
      include: {
        user: true,
        season: true,
      },
    })
  }

  async remove(where: Prisma.UserSeasonWhereUniqueInput): Promise<UserSeason> {
    return this.prismaService.userSeason.delete({
      where,
      include: {
        user: true,
        season: true,
      },
    })
  }
}
