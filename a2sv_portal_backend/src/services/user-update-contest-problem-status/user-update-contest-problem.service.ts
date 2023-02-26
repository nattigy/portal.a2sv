import { Injectable } from '@nestjs/common'
import { UserGroupSeasonService } from '../../app/user-group-season/user-group-season.service'
import { PrismaService } from '../../prisma/prisma.service'
import {
  UserGroupSeasonContestProblemService,
} from '../manage-user-group-season/user-group-season-contest-problem.service'
import { UserGroupSeasonContestService } from '../manage-user-group-season/user-group-season-contest.service'
import {
  UpdateUserGroupSeasonContestInput,
} from '../../app/user-group-season-contest/dto/update-user-group-season-contest.input'
import {
  UpdateUserGroupSeasonContestProblemInput,
} from '../../app/user-group-season-contest-problem/dto/update-user-group-season-contest-problem.input'

@Injectable()
export class UserUpdateContestProblemService {
  constructor(
    private readonly userGroupSeasonContestProblemService: UserGroupSeasonContestProblemService,
    private readonly userGroupSeasonContestService: UserGroupSeasonContestService,
    private readonly userGroupSeasonService: UserGroupSeasonService,
    private readonly prismaService: PrismaService,
  ) {
  }

  async userUpdateContestStatus(updateUserGroupSeasonContestInput: UpdateUserGroupSeasonContestInput) {
    const { userId, groupId, seasonId, contestId, ...updates } = updateUserGroupSeasonContestInput
    await this.userGroupSeasonService.upsert({
      userId, groupId, seasonId,
    })
    return this.userGroupSeasonContestService.upsert(updateUserGroupSeasonContestInput)
  }

  async userUpdateContestProblemStatus(updateUserGroupSeasonContestProblemInput: UpdateUserGroupSeasonContestProblemInput) {
    const { id, ...updates } = updateUserGroupSeasonContestProblemInput
    const { userId, groupId, seasonId, contestId, problemId } = id
    await this.userUpdateContestStatus({ userId, groupId, contestId, seasonId })
    return this.userGroupSeasonContestProblemService
      .updateUserGroupSeasonContestProblem(updateUserGroupSeasonContestProblemInput)
  }
}
