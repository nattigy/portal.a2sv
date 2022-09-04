import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Roles } from 'src/auth/auth.decorator'
import { CreateSeasonInput } from './dto/create-season.input'
import { UpdateSeasonInput } from './dto/update-season.input'
import { Season } from './entities/season.entity'
import { SeasonService } from './season.service'

@Resolver(() => Season)
export class SeasonResolver {
  constructor(private readonly seasonService: SeasonService) {}

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
  @Mutation(() => Season)
  createSeason(
    @Args('createSeasonInput') createSeasonInput: CreateSeasonInput,
  ) {
    return this.seasonService.createSeason(createSeasonInput)
  }

  @Query(() => [Season])
  seasons() {
    return this.seasonService.getSeasons()
  }

  @Query(() => Season)
  season(@Args('id', { type: () => Int }) id: number) {
    return this.seasonService.getSeasonById(id)
  }
  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
  @Mutation(() => Season)
  updateSeason(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateSeasonInput') updateSeasonInput: UpdateSeasonInput,
  ) {
    return this.seasonService.updateSeason(id, updateSeasonInput)
  }
  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
  @Mutation(() => Season)
  deleteSeason(@Args('id', { type: () => Int }) id: number) {
    return this.seasonService.deleteSeason(id)
  }
}
