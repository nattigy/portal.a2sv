import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Roles } from 'src/auth/auth.decorator'
import { PaginationSeason } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { SeasonTopic } from '../season-topic/entities/season-topic.entity'
import { CreateSeasonInput } from './dto/create-season.input'
import { UpdateSeasonInput } from './dto/update-season.input'
import { Season } from './entities/season.entity'
import { SeasonService } from './season.service'
import { FilterSeasonInput } from './dto/filter-season-input'

@Resolver(() => Season)
export class SeasonResolver {
  constructor(private readonly seasonService: SeasonService) {}

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
  @Mutation(() => Season)
  async createSeason(
    @Args('createSeasonInput') createSeasonInput: CreateSeasonInput,
  ): Promise<Season> {
    return this.seasonService.createSeason(createSeasonInput)
  }

  @Query(() => PaginationSeason)
  async seasons(
    @Args('filterSeasonInput', { type: () => PaginationInfoInput, nullable: true })
    filterSeasonInput?: FilterSeasonInput,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ): Promise<PaginationSeason> {
    return this.seasonService.findAll(filterSeasonInput, pageInfoInput)
  }

  @Query(() => Season)
  async season(@Args('seasonId', { type: () => String }) seasonId: string) {
    return this.seasonService.findOne(seasonId)
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
  @Mutation(() => Season)
  async updateSeason(
    @Args('seasonId', { type: () => String }) seasonId: string,
    @Args('updateSeasonInput') updateSeasonInput: UpdateSeasonInput,
  ): Promise<Season> {
    return this.seasonService.update(seasonId, updateSeasonInput)
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
  @Mutation(() => Season)
  async deleteSeason(@Args('seasonId', { type: () => String }) seasonId: string) {
    return this.seasonService.deleteSeason(seasonId)
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
  @ResolveField(() => [SeasonTopic])
  async topics(@Parent() season: Season): Promise<SeasonTopic[]> {
    return season.topics
  }
}
