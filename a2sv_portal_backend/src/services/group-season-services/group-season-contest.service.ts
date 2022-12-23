import { Injectable } from '@nestjs/common'
import { ContestRepository } from '../../app/contest/contest.repository'
import { GroupSeasonContestRepository } from '../../app/group-season-contest/group-season-contest.repository'
import { GroupSeasonRepository } from '../../app/group-season/group-season.repository'
import { SeasonContestService } from '../../app/season-contest/season-contest.service'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  CreateGroupSeasonContestInput,
  GroupSeasonContestId,
} from '../../app/group-season-contest/dto/create-group-season-contest.input'
import { UpdateGroupSeasonContestInput } from '../../app/group-season-contest/dto/update-group-season-contest.input'

@Injectable()
export class GroupSeasonContestService {
  // TODO: create constructor for groupSeasonContestRepository
  // TODO: add seasonContest service
  constructor(
    private readonly groupSeasonContestRepository: GroupSeasonContestRepository,
    private readonly groupSeasonRepository: GroupSeasonRepository,
    private readonly seasonContestService: SeasonContestService,
    private readonly prismaService: PrismaService,
    private readonly contestRepository: ContestRepository,
  ) {
  }

  async addContestToAGroupSeason(
    { groupId, seasonId, contestId }: CreateGroupSeasonContestInput,
  ) {
    const groupSeason = await this.groupSeasonRepository.findOne({
      groupId_seasonId: {
        groupId,
        seasonId,
      },
    })
    // TODO: check if the groupSeason is active if not throw an error
    if (!groupSeason.isActive) {
      throw new Error('This group season is not active!')
    }
    // TODO: upsert contest to seasonContest call seasonContest service
    await this.seasonContestService.addContestToASeason({ contestId, seasonId })
    // TODO: upsert groupSeasonContest // TODO: take start time and end time from contest
    const contest = await this.contestRepository.findOne({
      id: contestId,
    })
    const problems = contest.problems
    const groupSeasonContest = await this.groupSeasonContestRepository.upsert({
      where: {
        groupId_seasonId_contestId: {
          contestId,
          groupId,
          seasonId,
        },
      },
      data: {
        startTime: contest.startTime,
        endTime: contest.endTime,
      },
    })
    // TODO: upsert groupSeasonContestProblem with all problems found in the contest
    for (const problem of problems) {
      await this.prismaService.groupSeasonContestProblem.upsert({
        where: {
          groupId_seasonId_contestId_problemId: {
            seasonId, contestId, problemId: problem.id, groupId,
          },
        },
        create: {
          groupSeasonContest: {
            connect: {
              groupId_seasonId_contestId: {
                groupId,
                seasonId,
                contestId,
              },
            },
          },
          seasonContestProblem: {
            connect: {
              seasonId_contestId_problemId: {
                seasonId,
                contestId,
                problemId: problem.id,
              },
            },
          },
          problem: { connect: { id: problem.id } },
        },
        update: {},
      })
    }
    return groupSeasonContest
  }

  // TODO: addNewProblems and remove to groupSeasonContest (additional endpoints)

  async groupSeasonContests() {
    return `This action returns all groupSeasonContest`
  }

  async groupSeasonContest({ groupId, seasonId, contestId }: GroupSeasonContestId) {
    return `This action returns a #$ groupSeasonContest`
  }

  async updateGroupSeasonContest(
    updateGroupSeasonContestInput: UpdateGroupSeasonContestInput,
  ) {
    return `This action updates a #} groupSeasonContest`
  }

  async removeGroupSeasonContest(id: number) {
    return `This action removes a #${id} groupSeasonContest`
  }
}
