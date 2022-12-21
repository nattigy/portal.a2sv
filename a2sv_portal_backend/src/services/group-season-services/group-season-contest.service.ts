import { Injectable } from '@nestjs/common'
import { CreateGroupSeasonContestInput } from '../../app/group-season-contest/dto/create-group-season-contest.input'
import { UpdateGroupSeasonContestInput } from '../../app/group-season-contest/dto/update-group-season-contest.input'

@Injectable()
export class GroupSeasonContestService {
  // TODO: create constructor for groupSeasonContestRepository
  // TODO: add seasonContest service
  async addContestToAGroupSeason(createGroupSeasonContestInput: CreateGroupSeasonContestInput) {
    // TODO: check if the groupSeason is active
    // TODO: upsert contest to seasonContest call seasonContest service
    // TODO: create groupSeason contest
    // TODO: create groupSeasonContestProblem with all problems found in the contest
    // TODO: take start time and end time from contest
    return 'This action adds a new groupSeasonContest'
  }

  // TODO: addNewProblems and remove to groupSeasonContest (additional endpoints)

  async groupSeasonContests() {
    return `This action returns all groupSeasonContest`
  }

  async groupSeasonContest(id: number) {
    return `This action returns a #${id} groupSeasonContest`
  }

  async updateGroupSeasonContest(updateGroupSeasonContestInput: UpdateGroupSeasonContestInput) {
    return `This action updates a #} groupSeasonContest`
  }

  async removeGroupSeasonContest(id: number) {
    return `This action removes a #${id} groupSeasonContest`
  }
}
