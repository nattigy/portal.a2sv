import { Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserGroupSeasonDailyAnalyticsService } from './user-group-season-daily-analytics.service'
import { UserGroupSeasonDailyAnalytic } from './entities/user-group-season-daily-analytic.entity'

@Resolver()
export class UserGroupSeasonDailyAnalyticResolver {
  constructor(
    private readonly userGroupSeasonDailyAnalyticsService: UserGroupSeasonDailyAnalyticsService,
  ) {
  }

  @Query(() => [UserGroupSeasonDailyAnalytic])
  async userAnalyticsData(){
    return this.userGroupSeasonDailyAnalyticsService.findAll()
  }
}
