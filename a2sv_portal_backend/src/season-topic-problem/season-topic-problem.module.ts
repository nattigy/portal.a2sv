import { Module } from '@nestjs/common'
import { CaslModule } from '../casl/casl.module'
import { SeasonTopicProblemService } from './season-topic-problem.service'
import { SeasonTopicProblemResolver } from './season-topic-problem.resolver'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [
    SeasonTopicProblemResolver,
    SeasonTopicProblemService,
    PrismaService,
    CaslModule,
  ],
})
export class SeasonTopicProblemModule {}
