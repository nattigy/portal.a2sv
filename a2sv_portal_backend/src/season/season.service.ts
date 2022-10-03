import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateSeasonInput } from './dto/create-season.input'
import { UpdateSeasonInput } from './dto/update-season.input'
import { Season } from '@prisma/client'
@Injectable()
export class SeasonService {
  constructor(private readonly prismaService: PrismaService) {}
  async getSeasons(): Promise<Season[]> {
    return this.prismaService.season.findMany({
      include: { groupTopics: true },
    })
  }
  async getSeasonById(id: number): Promise<Season> {
    const season = await this.prismaService.season.findUnique({
      where: { id: id },
      include: { groupTopics: true },
    })
    if (!season) {
      throw new NotFoundException(`Season with id ${id} not found`)
    }
    return season
  }
  async createSeason(createSeasonInput: CreateSeasonInput): Promise<Season> {
    return await this.prismaService.season.create({
      data: createSeasonInput,
      include: { groupTopics: true },
    })
  }
  async updateSeason(
    id: number,
    updateSeasonInput: UpdateSeasonInput,
  ): Promise<Season> {
    return this.prismaService.season.update({
      where: { id: id },
      data: updateSeasonInput,
      include: { groupTopics: true },
    })
  }
  async deleteSeason(id: number): Promise<Season> {
    return this.prismaService.season.delete({
      where: { id },
      include: { groupTopics: true },
    })
  }
}
