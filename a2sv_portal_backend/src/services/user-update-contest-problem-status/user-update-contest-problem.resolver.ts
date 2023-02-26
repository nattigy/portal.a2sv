import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UserUpdateContestProblemService } from './user-update-contest-problem.service'
import {
  UserGroupSeasonContestProblem,
} from '../../app/user-group-season-contest-problem/entities/user-group-season-contest-problem.entity'
import {
  UpdateUserGroupSeasonContestProblemInput,
} from '../../app/user-group-season-contest-problem/dto/update-user-group-season-contest-problem.input'
import {
  UpdateUserGroupSeasonContestInput
} from '../../app/user-group-season-contest/dto/update-user-group-season-contest.input'
import { UserGroupSeasonContest } from '../../app/user-group-season-contest/entities/user-group-season-contest.entity'

@Resolver()
export class UserUpdateContestProblemResolver {
  constructor(
    private readonly userUpdateContestProblemService: UserUpdateContestProblemService,
  ) {
  }

  @Mutation(() => UserGroupSeasonContest)
  async updateUserContestStatus(
    @Args('updateUserGroupSeasonContestInput')
      updateUserGroupSeasonContestInput: UpdateUserGroupSeasonContestInput,
  ): Promise<UserGroupSeasonContest> {
    return this.userUpdateContestProblemService.userUpdateContestStatus(
      updateUserGroupSeasonContestInput,
    )
  }

  @Mutation(() => UserGroupSeasonContestProblem)
  async updateUserContestProblemStatus(
    @Args('updateUserGroupSeasonContestProblemInput')
      updateUserGroupSeasonContestProblemInput: UpdateUserGroupSeasonContestProblemInput,
  ): Promise<UserGroupSeasonContestProblem> {
    return this.userUpdateContestProblemService.userUpdateContestProblemStatus(
      updateUserGroupSeasonContestProblemInput,
    )
  }
}
