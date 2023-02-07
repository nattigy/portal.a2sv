import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentDataAnalyticsService } from './student-data-analytics.service';
import { StudentDataAnalytic } from './entities/student-data-analytic.entity';
import { CreateStudentDataAnalyticInput } from './dto/create-student-data-analytic.input';
import { UpdateStudentDataAnalyticInput } from './dto/update-student-data-analytic.input';
import { StudentWeeklyAnalytic } from './entities/weekly-data-analytic-entity';
import { StudentMonthlyAnalytic } from './entities/montly-data-analytic-entity';
import { StudentYearlyAnalytic } from './entities/yearly-data-analytic-entity';

@Resolver(() => StudentDataAnalytic)
export class StudentDataAnalyticsResolver {
  constructor(private readonly studentDataAnalyticsService: StudentDataAnalyticsService) {}

  @Query(() => [StudentDataAnalytic], { name: 'Studentdailystat' })
    findOne(
    @Args('user_id', { type: () => String }) userId: string,
    @Args('season_id', { type: () => String }) seasonId: string,
    @Args('start_date', { type: () => Date, nullable: true }) startDate?: Date,
    @Args('end_date', { type: () => Date, nullable: true }) endDate?: Date
  ): Promise<StudentDataAnalytic[]> {
    return this.studentDataAnalyticsService.userStat(userId,seasonId,startDate,endDate);
  }  

  @Query(() => [StudentWeeklyAnalytic], { name: 'Studentweeklystat' })
    userWeeklyStat(
    @Args('user_id', { type: () => String }) userId: string,
    @Args('season_id', { type: () => String }) seasonId: string,
    @Args('start_date', { type: () => Date, nullable: true }) startDate?: Date,
    @Args('end_date', { type: () => Date, nullable: true }) endDate?: Date
  ) {
    return this.studentDataAnalyticsService.weeklyUserStart(userId,seasonId,startDate,endDate);
  } 

  @Query(() => [StudentMonthlyAnalytic], { name: 'Studentmontlystat' })
  userMonthlyStat(
    @Args('user_id', { type: () => String }) userId: string,
    @Args('season_id', { type: () => String }) seasonId: string,
    @Args('start_date', { type: () => Date, nullable: true }) startDate?: Date,
    @Args('end_date', { type: () => Date, nullable: true }) endDate?: Date
) {
  return this.studentDataAnalyticsService.montlyUserStart(userId,seasonId,startDate,endDate);
} 

@Query(() => [StudentYearlyAnalytic], { name: 'Studentyearlystat' })
yearlyUserStat(
  @Args('user_id', { type: () => String }) userId: string,
  @Args('season_id', { type: () => String }) seasonId: string,
  @Args('start_date', { type: () => Date, nullable: true }) startDate?: Date,
  @Args('end_date', { type: () => Date, nullable: true }) endDate?: Date
) {
return this.studentDataAnalyticsService.yearlUserStat(userId,seasonId,startDate,endDate);
} 



}
