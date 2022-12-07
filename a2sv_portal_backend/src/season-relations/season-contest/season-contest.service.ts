import { Injectable } from '@nestjs/common'
import { CreateSeasonContestInput, SeasonContestId } from './dto/create-season-contest.input'
import { PrismaService } from '../../prisma/prisma.service'
import { SeasonContestRepository } from './season-contest.repository'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterSeasonContestInput } from './dto/filter-season-contest.input'

@Injectable()
export class SeasonContestService {
  constructor(
    private readonly seasonContestRepository: SeasonContestRepository,
    private readonly prismaService: PrismaService,
  ) {
  }

  async createSeasonContest({ seasonId, contestId }: CreateSeasonContestInput) {
    return this.seasonContestRepository.create({
      seasonId, contestId,
      season: { connect: { id: seasonId } },
      contest: { connect: { id: contestId } },
    })
  }

  async seasonContests(
    { seasonId, contestId }: FilterSeasonContestInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ) {
    return this.seasonContestRepository.findAll({
      skip, take,
      where: { seasonId, contestId },
    })
  }

  async seasonContest({ seasonId, contestId }: SeasonContestId) {
    return this.seasonContestRepository.findOne({
      seasonId_contestId: { seasonId, contestId },
    })
  }

  async removeSeasonContest({ seasonId, contestId }: SeasonContestId) {
    return this.seasonContestRepository.remove({
      seasonId_contestId: { seasonId, contestId },
    })
  }
}
