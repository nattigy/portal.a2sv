import { Injectable } from '@nestjs/common';
import { UserGroupSeasonDailyAnalyticInput } from './dto/create-user-group-season-daily-analytic.input';
import { PrismaService } from '../../prisma/prisma.service'
import { UserGroupSeasonId } from '../user-group-season/dto/create-group-user-season.input'

@Injectable()
export class UserGroupSeasonDailyAnalyticsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.userGroupSeasonDailyAnalytics.findAll({})
  }

  async findOne(id: number) {
    return this.prismaService.userGroupSeasonDailyAnalytics.findUnique({

    })
  }

  async upsert(updateUserGroupSeasonDailyAnalyticInput: UserGroupSeasonDailyAnalyticInput) {

  }

  async remove(id: UserGroupSeasonId) {
    return `This action removes a #${id} userGroupSeasonDailyAnalytic`;
  }
}
