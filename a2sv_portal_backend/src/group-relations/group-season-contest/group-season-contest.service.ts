import { Injectable } from '@nestjs/common'
import { CreateGroupSeasonContestInput } from './dto/create-group-season-contest.input'
import { UpdateGroupSeasonContestInput } from './dto/update-group-season-contest.input'

@Injectable()
export class GroupSeasonContestService {
  create(createGroupSeasonContestInput: CreateGroupSeasonContestInput) {
    // TODO: check if the groupSeason is active
    // TODO: upsert contest to seasonContest
    // TODO: create groupSeason contest
    // TODO: create groupSeasonContestProblem with all problems found in the contest
    return 'This action adds a new groupSeasonContest'
  }

  // TODO: addNewProblems and remove to groupSeasonContest (additional endpoints)

  findAll() {
    return `This action returns all groupSeasonContest`
  }

  findOne(id: number) {
    return `This action returns a #${id} groupSeasonContest`
  }

  update(updateGroupSeasonContestInput: UpdateGroupSeasonContestInput) {
    return `This action updates a #} groupSeasonContest`
  }

  remove(id: number) {
    return `This action removes a #${id} groupSeasonContest`
  }
}
