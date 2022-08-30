import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSeasonInput } from './dto/create-season.input';
import { UpdateSeasonInput } from './dto/update-season.input';
import { Season } from '@prisma/client';

@Injectable()
export class SeasonService {
    
    constructor(private readonly prismaService: PrismaService) { }
    findAll() {
        return this.prismaService.season.findMany()
    }
    findOneById(id: number): Promise<Season> {
        const season = this.prismaService.season.findUnique({ where: { id: id } })
        return season
    }
    async create(season: CreateSeasonInput): Promise<Season> {
        return await this.prismaService.season.create({ data: season })
    }
    update(id: number, updateSeasonInput: UpdateSeasonInput) {
        return this.prismaService.season.update({ where: { id }, data: { name:updateSeasonInput.name } })
    }
    remove(id: number) {
        return this.prismaService.season.delete({ where: { id } })
    }

}
