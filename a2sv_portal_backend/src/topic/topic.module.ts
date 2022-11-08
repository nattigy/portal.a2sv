import { Module } from '@nestjs/common'
import { CaslModule } from '../casl/casl.module'
import { TopicService } from './topic.service'
import { TopicResolver } from './topic.resolver'
import { PrismaService } from 'src/prisma.service'

@Module({
  providers: [TopicService, TopicResolver, PrismaService, CaslModule],
})
export class TopicModule {}
