import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PaginationSeason } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { CreateSeasonInput } from './dto/create-season.input'
import { UpdateSeasonInput } from './dto/update-season.input'
import { Season } from './entities/season.entity'
import { SeasonService } from './season.service'
import { FilterSeasonInput } from './dto/filter-season-input'
import descriptions from './season.doc'
import { BadRequestException } from '@nestjs/common'

@Resolver(() => Season)
export class SeasonResolver {
  constructor(private readonly seasonService: SeasonService) {
  }

  @Mutation(() => Season, { description: descriptions.createSeason })
  async createSeason(
    @Args('createSeasonInput') createSeasonInput: CreateSeasonInput,
  ): Promise<Season> {
    try {
      return this.seasonService.createSeason(createSeasonInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to create season!')
    }
  }

  @Query(() => PaginationSeason, { description: descriptions.seasons })
  async seasons(
    @Args('filterSeasonInput', { nullable: true }) filterSeasonInput?: FilterSeasonInput,
    @Args('pageInfoInput', { nullable: true }) pageInfoInput?: PaginationInput,
  ): Promise<PaginationSeason> {
    try {
      return this.seasonService.seasons(filterSeasonInput, pageInfoInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to load seasons!')
    }
  }

  @Query(() => Season, { description: descriptions.season })
  async season(@Args('seasonId') seasonId: string) {
    try {
      return this.seasonService.season(seasonId)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to load season!')
    }
  }

  @Mutation(() => Season, { description: descriptions.updateSeason })
  async updateSeason(
    @Args('updateSeasonInput') updateSeasonInput: UpdateSeasonInput,
  ): Promise<Season> {
    try {
      return this.seasonService.updateSeason(updateSeasonInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to update season!')
    }
  }

  @Mutation(() => Int, { description: descriptions.deleteSeason })
  async removeSeason(@Args('seasonId') seasonId: string) {
    try {
      return this.seasonService.removeSeason(seasonId)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to remove season!')
    }
  }
}
