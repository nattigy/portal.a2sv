import { Module } from '@nestjs/common'
import { ResourceRepository } from './resource.repository'
import { ResourceResolver } from './resource.resolver'
import { ResourceService } from './resource.service'

@Module({
  providers: [ResourceRepository, ResourceResolver, ResourceService],
  exports: [ResourceService],
})
export class ResourceModule {}
