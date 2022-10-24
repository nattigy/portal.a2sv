import { Module } from '@nestjs/common';
import { SeasonTopicProblemService } from './season-topic-problem.service';
import { SeasonTopicProblemResolver } from './season-topic-problem.resolver';
import {PrismaService} from "../prisma.service";

@Module({
  providers: [SeasonTopicProblemResolver, SeasonTopicProblemService, PrismaService]
})
export class SeasonTopicProblemModule {}
