import {Module} from '@nestjs/common'
import {GroupTopicSeasonProblemService} from './group-topic-season-problem.service'
import {GroupTopicSeasonProblemResolver} from './group-topic-season-problem.resolver'
import {PrismaService} from "../prisma.service";

@Module({
    providers: [GroupTopicSeasonProblemResolver, GroupTopicSeasonProblemService, PrismaService],
})
export class GroupTopicSeasonProblemModule {
}
