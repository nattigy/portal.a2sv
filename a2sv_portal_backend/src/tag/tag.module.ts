import { Module } from '@nestjs/common'
import { TagService } from './tag.service'
import { TagResolver } from './tag.resolver'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [TagResolver, TagService, PrismaService],
  exports: [TagService],
})
export class TagModule {}
