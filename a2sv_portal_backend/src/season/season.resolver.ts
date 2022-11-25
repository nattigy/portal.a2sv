import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { PaginationSeason } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { SeasonTopic } from '../season-topic/entities/season-topic.entity'
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
    @Args('filterSeasonInput', { type: () => FilterSeasonInput, nullable: true })
    filterSeasonInput?: FilterSeasonInput,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ): Promise<PaginationSeason> {
    return this.seasonService.findAll(filterSeasonInput, pageInfoInput)
  }

  @Query(() => Season, { description: descriptions.season })
  async season(@Args('seasonId', { type: () => String }) seasonId: string) {
    return this.seasonService.findOne(seasonId)
  }

  @Mutation(() => Season, { description: descriptions.updateSeason })
  async updateSeason(
    @Args('seasonId', { type: () => String }) seasonId: string,
    @Args('updateSeasonInput') updateSeasonInput: UpdateSeasonInput,
  ): Promise<Season> {
    return this.seasonService.update(seasonId, updateSeasonInput)
  }

  @ResolveField(() => [SeasonTopic])
  async topics(@Parent() season: Season): Promise<SeasonTopic[]> {
    return season.seasonTopics
  }

  @Mutation(() => Int, { description: descriptions.deleteSeason })
  async removeSeason(@Args('seasonId') seasonId: string) {
    return this.seasonService.remove(seasonId)
  }
}
