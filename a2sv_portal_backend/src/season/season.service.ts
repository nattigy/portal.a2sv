import { Injectable, NotFoundException, UseGuards } from '@nestjs/common'
import { Season } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { SeasonAbilities } from '../casl/handler/season-abilities.handler'
import { CheckPolicies } from '../casl/policy/policy.decorator'
import { PoliciesGuard } from '../casl/policy/policy.guard'
import { PaginationSeason } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { CreateSeasonInput } from './dto/create-season.input'
import { UpdateSeasonInput } from './dto/update-season.input'

@UseGuards(PoliciesGuard)
@Injectable()
export class SeasonService {
  constructor(private readonly prismaService: PrismaService) {}

  @CheckPolicies(SeasonAbilities.read)
  async getSeasons(
    pageInfoInput?: PaginationInfoInput,
  ): Promise<PaginationSeason> {
    const seasonsCount = (await this.prismaService.season.findMany({})).length
    const seasons = await this.prismaService.season.findMany({
      include: {
        topics: {
          include: {
            problems: {
              include: {
                problem: true,
              },
            },
          },
        },
      },
    })
    return {
      items: seasons,
      pageInfo: {
        skip: pageInfoInput.skip,
        take: pageInfoInput.take,
        count: seasonsCount,
      },
    }
  }

  @CheckPolicies(SeasonAbilities.read)
  async getSeasonById(id: string): Promise<Season> {
    const season = await this.prismaService.season.findUnique({
      where: { id: id },
      include: {
        topics: {
          include: {
            problems: {
              include: {
                problem: true,
              },
            },
          },
        },
      },
    })
    if (!season) {
      throw new NotFoundException(`Season with id ${id} not found`)
    }
    return season
  }

  @CheckPolicies(SeasonAbilities.create)
  async createSeason(createSeasonInput: CreateSeasonInput): Promise<Season> {
    return await this.prismaService.season.create({
      data: createSeasonInput,
      include: {
        topics: {
          include: {
            problems: {
              include: {
                problem: true,
              },
            },
          },
        },
      },
    })
  }

  @CheckPolicies(SeasonAbilities.update)
  async updateSeason(
    id: string,
    updateSeasonInput: UpdateSeasonInput,
  ): Promise<Season> {
    return this.prismaService.season.update({
      where: { id: id },
      data: updateSeasonInput,
      include: {
        topics: {
          include: {
            problems: {
              include: {
                problem: true,
              },
            },
          },
        },
      },
    })
  }

  @CheckPolicies(SeasonAbilities.delete)
  async deleteSeason(id: string): Promise<Season> {
    return this.prismaService.season.delete({
      where: { id },
    })
  }
}
