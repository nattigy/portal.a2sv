import {Module} from '@nestjs/common'
import {GroupTopicSeasonService} from './group-topic-season.service'
import {GroupTopicSeasonResolver} from './group-topic-season.resolver'
import {PrismaService} from "../prisma.service";

@Module({
    providers: [GroupTopicSeasonResolver, GroupTopicSeasonService, PrismaService],
})
export class GroupTopicSeasonModule {
}
