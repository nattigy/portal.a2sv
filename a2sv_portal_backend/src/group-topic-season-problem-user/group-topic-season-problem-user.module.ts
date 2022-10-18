import { Module } from '@nestjs/common'
import { GroupTopicSeasonProblemUserService } from './group-topic-season-problem-user.service'
import { GroupTopicSeasonProblemUserResolver } from './group-topic-season-problem-user.resolver'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [
    GroupTopicSeasonProblemUserResolver,
    GroupTopicSeasonProblemUserService,
    PrismaService,
  ],
})
export class GroupTopicSeasonProblemUserModule {}
