import { Query, Resolver } from '@nestjs/graphql'
import { UserGroupSeasonWeeklyAnalyticsService } from './user-group-season-weekly-analytics.service'
import { UserGroupSeasonWeeklyAnalytic } from './entities/user-group-season-weekly-analytic.entity'

@Resolver(() => UserGroupSeasonWeeklyAnalytic)
export class UserGroupSeasonWeeklyAnalyticsResolver {
  constructor(private readonly userGroupSeasonWeeklyAnalyticsService: UserGroupSeasonWeeklyAnalyticsService) {
  }

  // @Mutation(() => UserGroupSeasonWeeklyAnalytic)
  // createUserGroupSeasonWeeklyAnalytic(@Args('createUserGroupSeasonWeeklyAnalyticInput') createUserGroupSeasonWeeklyAnalyticInput: CreateUserGroupSeasonWeeklyAnalyticInput) {
  //   return this.userGroupSeasonWeeklyAnalyticsService.create(createUserGroupSeasonWeeklyAnalyticInput);
  // }

  @Query(() => [UserGroupSeasonWeeklyAnalytic], { name: 'userGroupSeasonWeeklyAnalytics' })
  findAll() {
    return this.userGroupSeasonWeeklyAnalyticsService.findAll()
  }

  // @Query(() => UserGroupSeasonWeeklyAnalytic, { name: 'userGroupSeasonWeeklyAnalytic' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.userGroupSeasonWeeklyAnalyticsService.findOne(id);
  // }
  //
  // @Mutation(() => UserGroupSeasonWeeklyAnalytic)
  // updateUserGroupSeasonWeeklyAnalytic(@Args('updateUserGroupSeasonWeeklyAnalyticInput') updateUserGroupSeasonWeeklyAnalyticInput: UpdateUserGroupSeasonWeeklyAnalyticInput) {
  //   return this.userGroupSeasonWeeklyAnalyticsService.update(updateUserGroupSeasonWeeklyAnalyticInput.id, updateUserGroupSeasonWeeklyAnalyticInput);
  // }
  //
  // @Mutation(() => UserGroupSeasonWeeklyAnalytic)
  // removeUserGroupSeasonWeeklyAnalytic(@Args('id', { type: () => Int }) id: number) {
  //   return this.userGroupSeasonWeeklyAnalyticsService.remove(id);
  // }
}
