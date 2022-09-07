import { Module } from '@nestjs/common'
import { GroupTopicService } from './group-topic.service'
import { GroupTopicResolver } from './group-topic.resolver'
import { PrismaService } from 'src/prisma.service'

@Module({
  providers: [GroupTopicResolver, GroupTopicService, PrismaService],
})
export class GroupTopicModule {}
