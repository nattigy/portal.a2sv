import { Injectable, NotFoundException, UseGuards } from '@nestjs/common'
import { SeasonAbilities } from '../../casl/handler/season-abilities.handler'
import { CheckPolicies } from '../../casl/policy/policy.decorator'
import { PoliciesGuard } from '../../casl/policy/policy.guard'
import { PaginationInput } from '../../common/page/pagination.input'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateSeasonInput } from './dto/create-season.input'
import { UpdateSeasonInput } from './dto/update-season.input'
import { Season } from './entities/season.entity'
import { FilterSeasonInput } from './dto/filter-season-input'
import { PaginationSeason } from '../../common/page/pagination-info'
import { SeasonRepository } from './season.repository';

@UseGuards(PoliciesGuard)
@Injectable()
export class SeasonService {
  constructor(private readonly prismaService: PrismaService, private readonly seasonRepository:SeasonRepository) {}

  async createSeason(seasonInput:CreateSeasonInput):Promise<Season>{
    return await this.seasonRepository.create({...seasonInput})
  }

  async findAll(
    filterSeasonInput: FilterSeasonInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ):Promise<PaginationSeason>{
    const count =  await this.seasonRepository.count(filterSeasonInput)
    const listSeason = await this.seasonRepository.findAll({})
    return {
      items:listSeason,
      pageInfo:{
        skip,count,take
      }
    }
  }

 async findOne(seasonId:string):Promise<Season>{
  return this.seasonRepository.findOne({id:seasonId})
 }

 async update(seasonId:string,updateSeasonInput:UpdateSeasonInput){
  return this.seasonRepository.update({where:{id:seasonId},data:{...updateSeasonInput}})
 }

  async remove(id: string): Promise<number> {
    try {
      await this.prismaService.season.delete({ where: { id } })
    } catch (e) {
      console.log(`Fail to delete season with id ${id}`, ' : ', e)
      throw new Error(`Fail to delete season with id ${id}`)
    }
    return 1
  }
}
