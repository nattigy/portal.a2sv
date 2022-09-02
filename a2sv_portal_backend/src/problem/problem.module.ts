import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemResolver } from './problem.resolver';
import { PrismaService } from '../prisma.service'
import { TagService } from '../tag/tag.service'

@Module({
  providers: [ProblemResolver, ProblemService, PrismaService, TagService]
})
export class ProblemModule {}
