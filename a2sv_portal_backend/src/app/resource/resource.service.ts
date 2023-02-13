import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PaginationResource } from 'src/common/page/pagination-info'
import { PaginationInput } from 'src/common/page/pagination.input'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateResourceInput } from './dto/create-resource.input'
import { FilterResourceInput } from './dto/filter-resource.input'
import { UpdateResourceInput } from './dto/update-resource.input'
import { Resource } from './entities/resource.entity'
import { ResourceRepository } from './resource.repository'

@Injectable()
export class ResourceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly resourceRepository: ResourceRepository,
  ) {}

  async createResource(createResourceInput: CreateResourceInput): Promise<Resource> {
    return this.resourceRepository.create(createResourceInput)
  }

  async resources(
    filterResourceInput?: FilterResourceInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationResource> {
    const filter: Prisma.ResourceWhereInput = {
      id: filterResourceInput?.id,
      type: filterResourceInput?.type,
      name: filterResourceInput?.name,
      description: filterResourceInput?.description,
      link: filterResourceInput?.link,
    }

    const resources = await this.resourceRepository.findAll({
      skip,
      take,
      where: filter,
    })
    const count = await this.resourceRepository.count(filter)
    return {
      items: resources,
      pageInfo: { skip, take, count },
    }
  }


  async resource(id: string): Promise<Resource>{
    const foundResource = await this.resourceRepository.findOne({id})
      if (!foundResource) throw new NotFoundException(`Resource with id ${id} dooesn't exist!`)
      return foundResource
  }
  async updateResource(
    id: string,
    updateResourceInput: UpdateResourceInput,
  ): Promise<Resource> {
    const foundResource = await this.prismaService.resource.findUnique({
      where: { id },
    })

    if (!foundResource) throw new NotFoundException(`Resource with id ${id} dooesn't exist!`)

    return this.resourceRepository.update({
      where: { id },
      data: updateResourceInput,
    })
  }

  async remove(id: string): Promise<number> {
    try {
      await this.resourceRepository.remove({ id })
    } catch (e) {
      throw new Error(`Fail to delete recource with id ${id}`)
    }
    return 1
  }
}
