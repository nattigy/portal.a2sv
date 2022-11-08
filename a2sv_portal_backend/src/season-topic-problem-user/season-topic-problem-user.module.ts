import { Module } from '@nestjs/common'
import { CaslModule } from '../casl/casl.module'
import { SeasonTopicProblemUserService } from './season-topic-problem-user.service'
import { SeasonTopicProblemUserResolver } from './season-topic-problem-user.resolver'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [
    SeasonTopicProblemUserResolver,
    SeasonTopicProblemUserService,
    PrismaService,
    CaslModule,
  ],
})
export class SeasonTopicProblemUserModule {}
