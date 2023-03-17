import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PaginationSeason } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { CreateSeasonInput } from './dto/create-season.input'
import { UpdateSeasonInput } from './dto/update-season.input'
import { Season } from './entities/season.entity'
import { SeasonService } from './season.service'
import { FilterSeasonInput } from './dto/filter-season-input'
import descriptions from './season.doc'
import { BadRequestException, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.service'
import { PoliciesGuard } from '../../casl/policy/policy.guard'
import { CheckPolicies } from '../../casl/policy/policy.decorator'
import { SeasonAbilities } from '../../casl/handler/season-abilities.handler'

@Resolver(() => Season)
export class SeasonResolver {
  constructor(private readonly seasonService: SeasonService) {}

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(SeasonAbilities.create)
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

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(SeasonAbilities.read)
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

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(SeasonAbilities.read)
  @Query(() => Season, { description: descriptions.season })
  async season(@Args('seasonId') seasonId: string) {
    try {
      return this.seasonService.season(seasonId)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to load season!')
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(SeasonAbilities.update)
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

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(SeasonAbilities.delete)
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
