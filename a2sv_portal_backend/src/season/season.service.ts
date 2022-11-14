import { Injectable, NotFoundException, UseGuards } from '@nestjs/common'
import { SeasonAbilities } from '../casl/handler/season-abilities.handler'
import { CheckPolicies } from '../casl/policy/policy.decorator'
import { PoliciesGuard } from '../casl/policy/policy.guard'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSeasonInput } from './dto/create-season.input'
import { UpdateSeasonInput } from './dto/update-season.input'
import { Season } from './entities/season.entity'
import { FilterSeasonInput } from './dto/filter-season-input'
import { PaginationSeason } from '../common/page/pagination-info'

@UseGuards(PoliciesGuard)
@Injectable()
export class SeasonService {
  constructor(private readonly prismaService: PrismaService) {
  }

  @CheckPolicies(SeasonAbilities.read)
  async findAll(
    filterSeasonInput: FilterSeasonInput,
    { take, skip }: PaginationInfoInput = { take: 50, skip: 0 },
  ): Promise<PaginationSeason> {
    const seasonsCount = (
      await this.prismaService.season.findMany({
        where: filterSeasonInput,
        select: {
          id: true,
        },
      })
    ).length
    const seasons = await this.prismaService.season.findMany({
      skip,
      take,
      where: filterSeasonInput,
      include: {
        topics: {
          include: {
            problems: {
              include: {
                problem: true,
              },
            },
            topic: true,
          },
        },
      },
    })
    return {
      items: seasons,
      pageInfo: {
        skip,
        take,
        count: seasonsCount,
      },
    }
  }

  @CheckPolicies(SeasonAbilities.read)
  async findOne(id: string): Promise<Season> {
    const season = await this.prismaService.season.findUnique({
      where: { id },
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
  async update(id: string, updateSeasonInput: UpdateSeasonInput): Promise<Season> {
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
