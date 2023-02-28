import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import {
  UpdateUserGroupSeasonContestProblemInput,
} from '../../app/user-group-season-contest-problem/dto/update-user-group-season-contest-problem.input'
import {
  UserGroupSeasonContestProblemService,
} from '../../app/user-group-season-contest-problem/user-group-season-contest-problem.service'
import {
  UpdateUserGroupSeasonContestInput,
} from '../../app/user-group-season-contest/dto/update-user-group-season-contest.input'
import { UserGroupSeasonService } from '../../app/user-group-season/user-group-season.service'
import { UserGroupSeasonContestService } from '../../app/user-group-season-contest/user-group-season-contest.service'

@Injectable()
export class UserUpdateContestProblemService {
  constructor(
    private readonly userGroupSeasonContestProblemService: UserGroupSeasonContestProblemService,
    private readonly userGroupSeasonContestService: UserGroupSeasonContestService,
    private readonly userGroupSeasonService: UserGroupSeasonService,
    private readonly prismaService: PrismaService,
  ) {
  }

  async userUpdateContestStatus(
    updateUserGroupSeasonContestInput: UpdateUserGroupSeasonContestInput,
  ) {
    const { userId, groupId, seasonId, contestId, ...updates } =
      updateUserGroupSeasonContestInput
    await this.userGroupSeasonService.upsert({
      userId,
      groupId,
      seasonId,
    })
    return this.userGroupSeasonContestService.upsert(updateUserGroupSeasonContestInput)
  }

  async userUpdateContestProblemStatus(
    updateUserGroupSeasonContestProblemInput: UpdateUserGroupSeasonContestProblemInput,
  ) {
    const { userId, groupId, seasonId, contestId, problemId, ...updates } =
      updateUserGroupSeasonContestProblemInput
    await this.userUpdateContestStatus({ userId, groupId, contestId, seasonId })
    return this.userGroupSeasonContestProblemService.updateUserGroupSeasonContestProblem(
      updateUserGroupSeasonContestProblemInput,
    )
  }
}
