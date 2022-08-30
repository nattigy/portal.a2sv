import {
    Args,
    Int,
    Mutation,
    Query,
    Resolver,
  } from '@nestjs/graphql'
import { CreateSeasonInput } from './dto/create-season.input'
import { UpdateSeasonInput } from './dto/update-season.input'
import { Season } from './entities/season.entity'
import { SeasonService } from './season.service'

 
  
  @Resolver(() => Season)
  export class SeasonResolver {
    constructor(private readonly seasonService: SeasonService) {}
  
    
  
    @Mutation((type) => Season, { nullable: true })
    async create(
      @Args('createSeasonInput') args: CreateSeasonInput,
    ): Promise<Season> {
      return this.seasonService.create(args)
    }

    @Query(() => [Season], { name:'seasons'})
    findAll() {
      return this.seasonService.findAll()
    }

    @Query(() => Season, { name:'season'})
    findOne(@Args('id',{type: () => Int})id:number) {
      return this.seasonService.findOneById(id)
    }
    // @Mutation(() => Season)
    // update(@Args('updateSeasonInput') updateSeasonInput:UpdateSeasonInput){
    //   return this.seasonService.update(updateSeasonInput ,updateSeasonInput)
    // }

  }
  