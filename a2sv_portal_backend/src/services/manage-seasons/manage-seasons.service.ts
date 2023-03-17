import { Injectable } from '@nestjs/common'
import { SeasonService } from '../../app/season/season.service'
import { UpdateSeasonInput } from '../../app/season/dto/update-season.input'
import { NotFoundException } from '@nestjs/common/exceptions'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class ManageSeasonsService {
  constructor(
    private readonly seasonService: SeasonService,
    private readonly prismaService: PrismaService,
  ) {}

  async updateSeason(updateSeasonInput: UpdateSeasonInput) {
    const { seasonId, ...updates } = updateSeasonInput
    // check if season with this Id exists and if it doesn't return
    // "season with this Id doesn't" exists error
    const season = await this.seasonService.season(seasonId)
    if (!season) {
      throw new NotFoundException(`Season with id ${seasonId} not found.`)
    }
    if (updates.isActive === false) {
      await this.prismaService.groupSeason.updateMany({
        where: { seasonId },
        data: { isActive: false },
      })
    }
    return this.seasonService.updateSeason(updateSeasonInput)
  }
}
