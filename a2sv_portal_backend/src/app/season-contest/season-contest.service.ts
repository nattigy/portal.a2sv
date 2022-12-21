import { Injectable } from '@nestjs/common'
import { CreateSeasonContestInput, SeasonContestId } from './dto/create-season-contest.input'
import { PrismaService } from '../../prisma/prisma.service'
import { SeasonContestRepository } from './season-contest.repository'
import { FilterSeasonContestInput } from './dto/filter-season-contest.input'
import { PaginationInput } from 'src/common/page/pagination.input'
import { ContestRepository } from '../../app/contest/contest.repository'

@Injectable()
export class SeasonContestService {
  constructor(
    private readonly seasonContestRepository: SeasonContestRepository,
    private readonly contestRepository: ContestRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async addContestToASeason({ seasonId, contestId }: CreateSeasonContestInput) {
    // add(upsert) seasonContestProblems from contest problems and use prismaService
    const contest = await this.contestRepository.findOne({
      id: contestId,
    })
    const problems = contest.problems
    const seasonContest = await this.seasonContestRepository.upsert({
      where: {
        seasonId_contestId: {
          seasonId,
          contestId,
        },
      },
      data: {},
    })

    for (const problem of problems) {
      await this.prismaService.seasonContestProblem.upsert({
        where: {
          seasonId_contestId_problemId:{
            seasonId, contestId, problemId: problem.id
          }
        },
        create: {
          seasonContest: {
            connect: {
              seasonId_contestId: {
                contestId,
                seasonId,
              },
            },
          },
          problem: { connect: { id: problem.id } },
        },
        update: {},
      })
    }
    return seasonContest
  }

  async seasonContest({ seasonId, contestId }: SeasonContestId) {
    /// TODO: generate stat here
    return this.seasonContestRepository.findOne({
      seasonId_contestId: { seasonId, contestId },
    })
  }

  async seasonContests(
    { seasonId, contestId }: FilterSeasonContestInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ) {
    return this.seasonContestRepository.findAll({
      skip,
      take,
      where: { seasonId, contestId },
    })
  }

  async removeSeasonContest({ seasonId, contestId }: SeasonContestId) {
    return this.seasonContestRepository.remove({
      seasonId_contestId: { seasonId, contestId },
    })
  }
}
