import { Module } from '@nestjs/common'
import { TopicService } from './topic.service'
import { TopicResolver } from './topic.resolver'
import { PrismaService } from 'src/prisma.service'

@Module({
  providers: [TopicService, TopicResolver, PrismaService],
})
export class TopicModule {}
