import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PaginationSeason } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { CreateSeasonInput } from './dto/create-season.input'
import { UpdateSeasonInput } from './dto/update-season.input'
import { Season } from './entities/season.entity'
import { SeasonService } from './season.service'
import { FilterSeasonInput } from './dto/filter-season-input'
import descriptions from './season.doc'

@Resolver(() => Season)
export class SeasonResolver {
  constructor(private readonly seasonService: SeasonService) {}

  @Mutation(() => Season, { description: descriptions.createSeason })
  async createSeason(
    @Args('createSeasonInput') createSeasonInput: CreateSeasonInput,
  ): Promise<Season> {
    return this.seasonService.createSeason(createSeasonInput)
  }

  @Query(() => PaginationSeason, { description: descriptions.seasons })
  async seasons(
    @Args('filterSeasonInput', { nullable: true }) filterSeasonInput?: FilterSeasonInput,
    @Args('pageInfoInput', { nullable: true }) pageInfoInput?: PaginationInput,
  ): Promise<PaginationSeason> {
    return this.seasonService.seasons(filterSeasonInput, pageInfoInput)
  }

  @Query(() => Season, { description: descriptions.season })
  async season(@Args('seasonId') seasonId: string) {
    return this.seasonService.season(seasonId)
  }

  @Mutation(() => Season, { description: descriptions.updateSeason })
  async updateSeason(
    @Args('updateSeasonInput') updateSeasonInput: UpdateSeasonInput,
  ): Promise<Season> {
    return this.seasonService.updateSeason(updateSeasonInput)
  }

  @Mutation(() => Int, { description: descriptions.deleteSeason })
  async removeSeason(@Args('seasonId') seasonId: string) {
    return this.seasonService.removeSeason(seasonId)
  }
}
