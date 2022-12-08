import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserSeasonContestProblem } from './entities/user-season-contest-problem.entity'

@Injectable()
export class UserSeasonContestProblemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserSeasonContestProblemCreateInput):Promise<UserSeasonContestProblem> {
    return this.prismaService.userSeasonContestProblem.create({
      data,
      include: {
        problem: {
          include: {
            tags: true
          }
        },
        userSeasonContest: {
          include: {
            user: true,
            seasonContest: true
          }
        }
      }
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserSeasonContestProblemWhereUniqueInput
    where?: Prisma.UserSeasonContestProblemWhereInput
    orderBy?: Prisma.UserSeasonContestProblemOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.userSeasonContestProblem.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findOne(where: Prisma.UserSeasonContestProblemWhereUniqueInput) {
    return this.prismaService.userSeasonContestProblem.findUnique({ where })
  }

  async update(params: {
    where: Prisma.UserSeasonContestProblemWhereUniqueInput
    data: Prisma.UserSeasonContestProblemUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.userSeasonContestProblem.update({ data, where })
  }

  async remove(where: Prisma.UserSeasonContestProblemWhereUniqueInput) {
    return this.prismaService.userSeasonContestProblem.delete({ where })
  }
}
