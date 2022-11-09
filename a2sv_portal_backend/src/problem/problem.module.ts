import { Module } from '@nestjs/common'
import { TagService } from '../tag/tag.service'
import { ProblemResolver } from './problem.resolver'
import { ProblemService } from './problem.service'

@Module({
  providers: [ProblemResolver, ProblemService, TagService],
})
export class ProblemModule {}
