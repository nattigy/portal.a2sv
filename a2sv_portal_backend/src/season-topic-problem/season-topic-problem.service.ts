import {Injectable} from '@nestjs/common';
import {CreateSeasonTopicProblemInput} from './dto/create-season-topic-problem.input';
import {UpdateSeasonTopicProblemInput} from './dto/update-season-topic-problem.input';
import {SeasonTopicProblem} from "./entities/season-topic-problem.entity";
import {SeasonTopicProblemId} from "./season-topic-problem.resolver";
import {PrismaService} from "../prisma.service";
import {Field, InputType} from "@nestjs/graphql";
import {PaginationEntity} from "../pagination.entity";

@InputType()
export class SeasonTopicProblemFilter extends PaginationEntity {
    seasonId: string
    topicId: string
    problemId: string
}

@Injectable()
export class SeasonTopicProblemService {
    constructor(private readonly prismaService: PrismaService) {
    }

    create(createSeasonTopicProblemInput: CreateSeasonTopicProblemInput) {
        return this.prismaService.seasonTopicProblem.create({data: createSeasonTopicProblemInput})
    }

    findAll({take, skip, seasonId, topicId, problemId}: SeasonTopicProblemFilter) {
        return this.prismaService.seasonTopicProblem.findMany({
            take,
            skip,
            where: {
                seasonId,
                problemId,
                topicId
            }
        })
    }

    findOne({seasonId, topicId, problemId}: SeasonTopicProblemId) {
        return this.prismaService.seasonTopicProblem.findUnique({
            where: {
                seasonId_topicId_problemId: {
                    seasonId,
                    topicId,
                    problemId
                }
            }
        })
    }

    update({seasonId, topicId, problemId, ...updates}: UpdateSeasonTopicProblemInput) {
        return this.prismaService.seasonTopicProblem.update({
            where: {
                seasonId_topicId_problemId: {
                    seasonId,
                    topicId,
                    problemId
                }
            },
            data: updates
        })
    }

    remove({seasonId, problemId, topicId}: SeasonTopicProblemId) {
        return this.prismaService.seasonTopicProblem.delete({
            where: {
                seasonId_topicId_problemId: {
                    seasonId,
                    problemId,
                    topicId
                }
            }
        })
    }
}
