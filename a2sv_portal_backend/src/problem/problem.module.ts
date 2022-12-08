import { Module } from '@nestjs/common'
import { TagService } from '../tag/tag.service'
import { ProblemRepository } from './problem.repository'
import { ProblemResolver } from './problem.resolver'
import { ProblemService } from './problem.service'

@Module({
  providers: [ProblemRepository, ProblemResolver, ProblemService, TagService],
})
export class ProblemModule {}
