import { Args, Query, Resolver } from '@nestjs/graphql'
import { StudentDataAnalyticsService } from './student-data-analytics.service'
import { StudentDataAnalytic } from './entities/student-data-analytic.entity'
import { StudentWeeklyAnalytic } from './entities/weekly-data-analytic-entity'
import { StudentMonthlyAnalytic } from './entities/montly-data-analytic-entity'
import { StudentYearlyAnalytic } from './entities/yearly-data-analytic-entity'

@Resolver(() => StudentDataAnalytic)
export class StudentDataAnalyticsResolver {
  constructor(private readonly studentDataAnalyticsService: StudentDataAnalyticsService) {}

  @Query(() => [StudentDataAnalytic], { name: 'Studentdailystat' })
  findOne(
    @Args('user_id', { type: () => String }) userId: string,
    @Args('season_id', { type: () => String }) seasonId: string
  ): Promise<StudentDataAnalytic[]> {
    return this.studentDataAnalyticsService.userStat(userId, seasonId)
  }

  @Query(() => [StudentWeeklyAnalytic], { name: 'Studentweeklystat' })
  userWeeklyStat(
    @Args('user_id', { type: () => String }) userId: string,
    @Args('season_id', { type: () => String }) seasonId: string,
    @Args('start_date', { type: () => Date, nullable: true }) startDate?: Date,
    @Args('end_date', { type: () => Date, nullable: true }) endDate?: Date,
  ) {
    return this.studentDataAnalyticsService.weeklyUserStart(
      userId,
      seasonId,
      startDate,
      endDate,
    )
  }

  @Query(() => [StudentMonthlyAnalytic], { name: 'Studentmontlystat' })
  userMonthlyStat(
    @Args('user_id', { type: () => String }) userId: string,
    @Args('season_id', { type: () => String }) seasonId: string
  ) {
    return this.studentDataAnalyticsService.montlyUserStart(
      userId,
      seasonId
    )
  }

  @Query(() => [StudentYearlyAnalytic], { name: 'Studentyearlystat' })
  yearlyUserStat(
    @Args('user_id', { type: () => String }) userId: string,
    @Args('season_id', { type: () => String }) seasonId: string
  ) {
    return this.studentDataAnalyticsService.yearlUserStat(userId, seasonId)
  }
}
