import {Injectable, NotFoundException} from '@nestjs/common'
import {PrismaService} from 'src/prisma.service'
import {CreateSeasonInput} from './dto/create-season.input'
import {UpdateSeasonInput} from './dto/update-season.input'
import {Season} from '@prisma/client'

@Injectable()
export class SeasonService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async getSeasons(): Promise<Season[]> {
        return this.prismaService.season.findMany({
            include: {
                topics: {
                    include: {
                        problems: {
                            include: {
                                problem: true
                            }
                        }
                    },
                },
            },
        })
    }

    async getSeasonById(id: string): Promise<Season> {
        const season = await this.prismaService.season.findUnique({
            where: {id: id},
            include: {
                topics: {
                    include: {
                        problems: {
                            include: {
                                problem: true
                            }
                        }
                    },
                },
            },
        })
        if (!season) {
            throw new NotFoundException(`Season with id ${id} not found`)
        }
        return season
    }

    async createSeason(createSeasonInput: CreateSeasonInput): Promise<Season> {
        return await this.prismaService.season.create({
            data: createSeasonInput,
            include: {
                topics: {
                    include: {
                        problems: {
                            include: {
                                problem: true
                            }
                        }
                    },
                },
            },
        })
    }

    async updateSeason(
        id: string,
        updateSeasonInput: UpdateSeasonInput,
    ): Promise<Season> {
        return this.prismaService.season.update({
            where: {id: id},
            data: updateSeasonInput,
            include: {
                topics: {
                    include: {
                        problems: {
                            include: {
                                problem: true
                            }
                        }
                    },
                },
            },
        })
    }

    async deleteSeason(id: string): Promise<Season> {
        return this.prismaService.season.delete({
            where: {id},
        })
    }
}
