import { Module } from '@nestjs/common'
import { CaslModule } from '../casl/casl.module'
import { ProblemService } from './problem.service'
import { ProblemResolver } from './problem.resolver'
import { PrismaService } from '../prisma.service'
import { TagService } from '../tag/tag.service'

@Module({
  providers: [
    ProblemResolver,
    ProblemService,
    PrismaService,
    TagService,
    CaslModule,
  ],
})
export class ProblemModule {}
