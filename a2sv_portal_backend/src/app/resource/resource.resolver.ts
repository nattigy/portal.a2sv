import { Query } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common/exceptions'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateResourceInput } from './dto/create-resource.input'
import { UpdateResourceInput } from './dto/update-resource.input'

import { Resource } from './entities/resource.entity'
import { ResourceService } from './resource.service'

@Resolver(() => Resource)
export class ResourceResolver {
  constructor(private readonly resourceService: ResourceService) {}
  // @Mutation(() => Resource)
  // async createResource(
  //   @Args('createResourceInput') createResourceInput: CreateResourceInput,
  // ): Promise<Resource> {
  //   return this.resourceService.createResource(createResourceInput)
  // }

  // // @Query(()=>Resource)
  // // async resource(@Args('resourceId') id:string):Promise<Resource>{
  // //   return await this.resourceService.resource(id)
  // // }

  @Mutation(() => Resource)
  async updateResource(
    @Args('updateTagInput') updateResourceInput: UpdateResourceInput,
  ): Promise<Resource> {
    try {
      return await this.resourceService.updateResource(
        updateResourceInput.id,
        updateResourceInput,
      )
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Error Updating resource!')
    }
  }

  // @Mutation(() => Resource)
  // async removeResource(@Args('resourceId') id: string): Promise<number> {
  //   return await this.resourceService.remove(id)
  // }
}
