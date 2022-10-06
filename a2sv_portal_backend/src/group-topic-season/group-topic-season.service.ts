import {Injectable} from '@nestjs/common'
import {CreateGroupTopicSeasonInput} from './dto/create-group-topic-season.input'
import {UpdateGroupTopicSeasonInput} from './dto/update-group-topic-season.input'
import {PrismaService} from "../prisma.service";
import {Field, InputType, Int} from "@nestjs/graphql";

@InputType()
export class GroupTopicSeasonWhereInput {
    @Field(() => Int, {nullable: true})
    groupId?: number
    @Field(() => Int, {nullable: true})
    topicId?: number
    @Field(() => Int, {nullable: true})
    @Field(() => Int, {nullable: true})
    seasonId?: number
    @Field(() => Int, {nullable: true})
    take?: number
    @Field(() => Int, {nullable: true})
    skip?: number
}

@Injectable()
export class GroupTopicSeasonService {
    constructor(private readonly prismaService: PrismaService) {
    }

    createGroupTopicSeason(createGroupTopicSeasonInput: CreateGroupTopicSeasonInput) {
        return this.prismaService.groupTopicSeason.create({
            data: createGroupTopicSeasonInput,
            include: {
                problems: {
                    include: {
                        problem: true
                    }
                }
            }
        })
    }

    groupTopicSeasons(filter: GroupTopicSeasonWhereInput) {
        const {take, skip, ...filter2} = filter
        return this.prismaService.groupTopicSeason.findMany({
            take,
            skip,
            where: filter2,
            include: {
                group: true,
                season: true,
                topic: true,
                problems: {
                    include: {
                        problem: true
                    }
                }
            }
        })
    }

    groupTopicSeason(groupId: number, topicId: number, seasonId: number) {
        return this.prismaService.groupTopicSeason.findUnique({
            where: {
                groupId_topicId_seasonId: {
                    groupId: groupId,
                    topicId: topicId,
                    seasonId: seasonId
                }
            },
            include: {
                group: true,
                topic: true,
                problems: {
                    include: {
                        problem: true
                    }
                },
                season: true
            }
        })
    }

    updateGroupTopicSeason(updateGroupTopicSeasonInput: UpdateGroupTopicSeasonInput) {

        const {problems, ...rest} = updateGroupTopicSeasonInput
        return this.prismaService.groupTopicSeason.update({
            where: {
                groupId_topicId_seasonId: {
                    groupId: updateGroupTopicSeasonInput.groupId,
                    topicId: updateGroupTopicSeasonInput.topicId,
                    seasonId: updateGroupTopicSeasonInput.seasonId
                }
            },
            data: {
                ...rest,
                problems: {
                    connectOrCreate: problems.map((problem) => {
                        return {
                            where: {
                                problemId_groupId_topicId_seasonId: {
                                    problemId: problem.problemId,
                                    groupId: updateGroupTopicSeasonInput.groupId,
                                    seasonId: updateGroupTopicSeasonInput.seasonId,
                                    topicId: updateGroupTopicSeasonInput.topicId
                                }
                            },
                            create: {
                                problem: {
                                    connect: {id: problem.problemId}
                                }
                            }
                        }
                    })
                }
            },
            include: {
                problems: {
                    include: {
                        problem: true
                    }
                }
            }
        })
    }

    removeGroupTopicSeason(id: number) {
        return `This action removes a #${id} groupTopicSeason`
    }
}
