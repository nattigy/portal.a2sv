import { Args, Query, Resolver } from '@nestjs/graphql'
import { UserGroupSeasonContestService } from '../user-group-season-contest/user-group-season-contest.service'
import { UserGroupSeasonContest } from '../user-group-season-contest/entities/user-group-season-contest.entity'
import { UserGroupSeasonContestId } from '../user-group-season-contest/dto/create-user-group-season-contest.input'
import { PaginationUserGroupSeasonContest } from '../../common/page/pagination-info'
import {
  FilterUserGroupSeasonContestInput,
} from '../user-group-season-contest/dto/filter-user-group-season-contest.input'
import { PaginationInput } from '../../common/page/pagination.input'

@Resolver()
export class UserGroupSeasonContestProblemResolver {
  constructor(
    private readonly userGroupSeasonContestService: UserGroupSeasonContestService,
  ) {
  }

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
