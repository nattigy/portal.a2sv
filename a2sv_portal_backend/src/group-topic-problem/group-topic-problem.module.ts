import { Module } from '@nestjs/common'
import { GroupTopicProblemService } from './group-topic-problem.service'
import { GroupTopicProblemResolver } from './group-topic-problem.resolver'
import { PrismaService } from 'src/prisma.service'

@Module({
  providers: [
    GroupTopicProblemResolver,
    GroupTopicProblemService,
    PrismaService,
  ],
})
export class GroupTopicProblemModule {}
