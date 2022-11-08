import { Module } from '@nestjs/common'
import { CaslModule } from '../casl/casl.module'
import { TagService } from './tag.service'
import { TagResolver } from './tag.resolver'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [TagResolver, TagService, PrismaService, CaslModule],
  exports: [TagService],
})
export class TagModule {}
