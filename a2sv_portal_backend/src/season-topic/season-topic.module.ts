import { Module } from '@nestjs/common'
import { CaslModule } from '../casl/casl.module'
import { SeasonTopicService } from './season-topic.service'
import { SeasonTopicResolver } from './season-topic.resolver'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [
    SeasonTopicResolver,
    SeasonTopicService,
    PrismaService,
    CaslModule,
  ],
})
export class SeasonTopicModule {}
