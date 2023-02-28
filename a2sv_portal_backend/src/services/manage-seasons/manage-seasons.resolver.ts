import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Season } from '../../app/season/entities/season.entity'
import { BadRequestException, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../app/auth/guards/jwt-auth-guard.service'
import { PoliciesGuard } from '../../casl/policy/policy.guard'
import { CheckPolicies } from '../../casl/policy/policy.decorator'
import { SeasonAbilities } from '../../casl/handler/season-abilities.handler'
import descriptions from '../../app/season/season.doc'
import { UpdateSeasonInput } from '../../app/season/dto/update-season.input'
import { ManageSeasonsService } from './manage-seasons.service'

@Resolver(() => Season)
export class ManageSeasonsResolver {
  constructor(private readonly manageSeasonService: ManageSeasonsService) {}

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(SeasonAbilities.update)
  @Mutation(() => Season, { description: descriptions.updateSeason })
  async updateSeason(
    @Args('updateSeasonInput') updateSeasonInput: UpdateSeasonInput,
  ): Promise<Season> {
    try {
      return this.manageSeasonService.updateSeason(updateSeasonInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to update season!')
    }
  }
}
