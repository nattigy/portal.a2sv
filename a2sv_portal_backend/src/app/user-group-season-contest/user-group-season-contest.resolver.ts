import { Args, Query, Resolver } from '@nestjs/graphql'
import { PaginationUserGroupSeasonContest } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { UserGroupSeasonContestService } from './user-group-season-contest.service'
import { UserGroupSeasonContest } from './entities/user-group-season-contest.entity'
import { UserGroupSeasonContestId } from './dto/create-user-group-season-contest.input'
import { FilterUserGroupSeasonContestInput } from './dto/filter-user-group-season-contest.input'

@Resolver()
export class UserGroupSeasonContestResolver {
  constructor(private readonly userGroupSeasonContestService: UserGroupSeasonContestService) {}

  @Query(() => UserGroupSeasonContest)
  async userGroupSeasonContest(
    @Args('userGroupSeasonContestId') userGroupSeasonContestId: UserGroupSeasonContestId,
  ): Promise<UserGroupSeasonContest> {
    return this.userGroupSeasonContestService.userGroupSeasonContest(userGroupSeasonContestId)
  }

  @Query(() => PaginationUserGroupSeasonContest)
  async userGroupSeasonContests(
    @Args('filterUserGroupSeasonContestInput')
    filterUserGroupSeasonContestInput: FilterUserGroupSeasonContestInput,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ): Promise<PaginationUserGroupSeasonContest> {
    return this.userGroupSeasonContestService.userGroupSeasonContests(
      filterUserGroupSeasonContestInput,
      paginationInput,
    )
  }
}
