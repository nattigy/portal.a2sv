import { Query, Resolver } from '@nestjs/graphql'
import { UserGroupSeasonMonthlyAnalyticsService } from './user-group-season-monthly-analytics.service'
import { UserGroupSeasonMonthlyAnalytic } from './entities/user-group-season-monthly-analytic.entity'

@Resolver(() => UserGroupSeasonMonthlyAnalytic)
export class UserGroupSeasonMonthlyAnalyticsResolver {
  constructor(private readonly userGroupSeasonMonthlyAnalyticsService: UserGroupSeasonMonthlyAnalyticsService) {
  }

  // @Mutation(() => UserGroupSeasonMonthlyAnalytic)
  // createUserGroupSeasonMonthlyAnalytic(@Args('createUserGroupSeasonMonthlyAnalyticInput') createUserGroupSeasonMonthlyAnalyticInput: CreateUserGroupSeasonMonthlyAnalyticInput) {
  //   return this.userGroupSeasonMonthlyAnalyticsService.create(createUserGroupSeasonMonthlyAnalyticInput);
  // }

  @Query(() => [UserGroupSeasonMonthlyAnalytic], { name: 'userGroupSeasonMonthlyAnalytics' })
  findAll() {
    return this.userGroupSeasonMonthlyAnalyticsService.findAll()
  }

  // @Query(() => UserGroupSeasonMonthlyAnalytic, { name: 'userGroupSeasonMonthlyAnalytic' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.userGroupSeasonMonthlyAnalyticsService.findOne(id);
  // }
  //
  // @Mutation(() => UserGroupSeasonMonthlyAnalytic)
  // updateUserGroupSeasonMonthlyAnalytic(@Args('updateUserGroupSeasonMonthlyAnalyticInput') updateUserGroupSeasonMonthlyAnalyticInput: UpdateUserGroupSeasonMonthlyAnalyticInput) {
  //   return this.userGroupSeasonMonthlyAnalyticsService.update(updateUserGroupSeasonMonthlyAnalyticInput.id, updateUserGroupSeasonMonthlyAnalyticInput);
  // }
  //
  // @Mutation(() => UserGroupSeasonMonthlyAnalytic)
  // removeUserGroupSeasonMonthlyAnalytic(@Args('id', { type: () => Int }) id: number) {
  //   return this.userGroupSeasonMonthlyAnalyticsService.remove(id);
  // }
}
