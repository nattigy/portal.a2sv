import { Injectable, UseGuards } from '@nestjs/common'
import { PoliciesGuard } from '../../casl/policy/policy.guard'
import { PaginationInput } from '../../common/page/pagination.input'
import { CreateSeasonInput } from './dto/create-season.input'
import { UpdateSeasonInput } from './dto/update-season.input'
import { Season } from './entities/season.entity'
import { FilterSeasonInput } from './dto/filter-season-input'
import { PaginationSeason } from '../../common/page/pagination-info'
import { SeasonRepository } from './season.repository'
import { NotFoundException } from '@nestjs/common/exceptions'

@UseGuards(PoliciesGuard)
@Injectable()
export class SeasonService {
  constructor(private readonly seasonRepository: SeasonRepository) {}

  async createSeason(seasonInput: CreateSeasonInput): Promise<Season> {
    return this.seasonRepository.create(seasonInput)
  }

  async seasons(
    filterSeasonInput: FilterSeasonInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationSeason> {
    const count = await this.seasonRepository.count(filterSeasonInput)
    const listSeason = await this.seasonRepository.findAll({
      skip,
      take,
      where: filterSeasonInput,
    })
    return {
      items: listSeason,
      pageInfo: { skip, count, take },
    }
  }

  async season(seasonId: string): Promise<Season> {
    const season = this.seasonRepository.findOne({ id: seasonId })
    if (!season) {
      throw new NotFoundException(`Season with id ${seasonId} not found.`)
    }
    return season
  }

  async updateSeason({ seasonId, ...updates }: UpdateSeasonInput) {
    return this.seasonRepository.update({
      where: { id: seasonId },
      data: updates,
    })
  }

  async removeSeason(id: string): Promise<number> {
    try {
      await this.seasonRepository.remove({ id })
    } catch (e) {
      console.log(`Fail to delete season with id ${id}`, ' : ', e)
      throw new Error(`Fail to delete season with id ${id}`)
    }
    return 1
  }
}
