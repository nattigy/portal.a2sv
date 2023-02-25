import { Injectable } from '@nestjs/common'
import { GroupSeasonContestRepository } from '../../app/group-season-contest/group-season-contest.repository'
import { GroupSeasonRepository } from '../../app/group-season/group-season.repository'
import { PrismaService } from '../../prisma/prisma.service'
import { ContestRepository } from '../../app/contest/contest.repository'
import {
  CreateGroupSeasonContestInput,
  GroupSeasonContestId,
} from '../../app/group-season-contest/dto/create-group-season-contest.input'
import { FilterGroupSeasonContestInput } from '../../app/group-season-contest/dto/filter-group-season-contest.input'
import { PaginationInput } from '../../common/page/pagination.input'
import {
  GroupSeasonContestProblemRepository,
} from '../../app/group-season-contest-problem/group-season-contest-problem.repository'
import { GroupSeasonContest } from '../../app/group-season-contest/entities/group-season-contest.entity'

@Injectable()
export class ManageGroupSeasonContestService {
  // TODO: create constructor for groupSeasonContestRepository
  // TODO: add seasonContest service
  constructor(
    private readonly groupSeasonContestRepository: GroupSeasonContestRepository,
    private readonly groupSeasonContestProblemRepository: GroupSeasonContestProblemRepository,
    private readonly groupSeasonRepository: GroupSeasonRepository,
    private readonly prismaService: PrismaService,
    private readonly contestRepository: ContestRepository,
  ) {
  }

  async addContestToAGroupSeason({
                                   groupId,
                                   seasonId,
                                   contestId,
                                 }: CreateGroupSeasonContestInput) {
    const groupSeason = await this.groupSeasonRepository.findOne({
      groupId_seasonId: {
        groupId,
        seasonId,
      },
    })
    /** check if the groupSeason is active if not throw an error */
    if (!groupSeason.isActive) {
      throw new Error('This group season is not active!')
    }
    /** upsert groupSeasonContest
     *  take start time and end time from contest
     */
    const contest = await this.contestRepository.findOne({
      id: contestId,
    })
    // const contestProblems = contest.contestProblems
    return this.groupSeasonContestRepository.upsert({
      where: {
        groupId_seasonId_contestId: {
          contestId,
          groupId,
          seasonId,
        },
      },
      data: {
        // startTime: contest.startTime,
        // endTime: contest.endTime,
      },
    })
    // /** upsert groupSeasonContestProblem with all problems found in the contest */
    // for (const problem of contestProblems) {
    //   const { contestId, problemId } = problem
    //   await this.groupSeasonContestProblemRepository.upsert({
    //     where: {
    //       groupId_seasonId_contestId_problemId: {
    //         groupId, seasonId, contestId, problemId,
    //       },
    //     },
    //     data: {},
    //   })
    // }
    // return groupSeasonContest
  }

  // async addProblemsToContest(contestId: string, problemIds: string[]) {
  //   /**
  //    * Find groupSeasonContests first
  //    * connect the problems to all groupSeasonContests
  //    * */
  //   const groupSeasonContests = await this.groupSeasonContestRepository.findAll({
  //     where: { contestId },
  //   })
  //
  //   await this.prismaService.groupSeasonContestProblem.createMany({
  //     skipDuplicates: true,
  //     data: groupSeasonContests.map(g => ({
  //       groupId: g.groupId,
  //       seasonId: g.seasonId,
  //       contestId,
  //     })).map(id => problemIds.map(p => ({ ...id, problemId: p }))).flat(1),
  //   })
  //
  //   return problemIds.length
  // }

  // TODO: addNewProblems and remove to groupSeasonContest (additional endpoints)

  async groupSeasonContests(
    filterGroupSeasonContest: FilterGroupSeasonContestInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<GroupSeasonContest[]> {
    return this.groupSeasonContestRepository.findAll({
      skip,
      take,
      where: filterGroupSeasonContest,
    })
  }

  async groupSeasonContest({ groupId, seasonId, contestId }: GroupSeasonContestId): Promise<GroupSeasonContest> {
    return this.groupSeasonContestRepository.findOne({
      groupId_seasonId_contestId: { groupId, seasonId, contestId },
    })
  }

  async removeGroupSeasonContest({ groupId, seasonId, contestId }: GroupSeasonContestId) {
    return this.groupSeasonContestRepository.remove({
      groupId_seasonId_contestId: { contestId, seasonId, groupId },
    })
  }
}
