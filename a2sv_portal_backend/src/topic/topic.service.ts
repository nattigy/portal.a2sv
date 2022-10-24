import {Injectable, NotFoundException} from '@nestjs/common'
import {PrismaService} from 'src/prisma.service'
import {Topic} from '@prisma/client'
import {CreateTopicInput} from './dto/create-topic.input'
import {UpdateTopicInput} from './dto/update-topic.input'
import {AddTopicToSeasonInput} from './dto/add-topic-to-season-input'

export interface TopicWhereInput {
    skip?: number
    take?: number
    groupId?: string
    seasonId?: string
}

@Injectable()
export class TopicService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async getTopics({skip, take, groupId, seasonId}: TopicWhereInput = {}): Promise<Topic[] | []> {
        // console.log(groupId, seasonId)
        return this.prismaService.topic.findMany({
            skip,
            take,
            where: {
                seasons: {
                    some: seasonId && {
                        seasonId,
                    },
                },
            },
            include: {
                seasons: {
                    include: {
                        problems: {
                            include: {
                                problem: true,
                            },
                        },
                    },
                },
            },
        })
    }

    async getTopicById(id: string): Promise<Topic> {
        const topic = await this.prismaService.topic.findUnique({
            where: {id: id},
            include: {
                seasons: {
                    include: {
                        topic: true,
                        problems: {
                            include: {
                                problem: true,
                            },
                        },
                    },
                },
            },
        })
        if (!topic) {
            throw new NotFoundException(`Topic with id ${id} not found`)
        }
        return topic
    }

    async createTopic(createTopicInput: CreateTopicInput): Promise<Topic> {
        const {...data} = createTopicInput
        const queryData = data as any
        return await this.prismaService.topic.create({
            data: queryData,
            include: {
                seasons: {
                    include: {
                        problems: {
                            include: {
                                problem: true,
                            },
                        },
                    },
                },
            },
        })
    }

    async updateTopic(
        givenId: string,
        updateTopicInput: UpdateTopicInput,
    ): Promise<Topic> {
        const {id, ...data} = updateTopicInput
        const queryData = data as any
        return this.prismaService.topic.update({
            where: {id: id},
            data: queryData,
            include: {
                seasons: {
                    include: {
                        problems: {
                            include: {
                                problem: true,
                            },
                        },
                    },
                },
            },
        })
    }

    async deleteTopic(id: string): Promise<Topic> {
        return this.prismaService.topic.delete({where: {id}})
    }

    async addTopicToSeason(addTopicToSeasonInput: AddTopicToSeasonInput) {
        return this.prismaService.season.update({
            data: {
                topics: {
                    create: {
                        topic: {
                            connect: {
                                id: addTopicToSeasonInput.topicId
                            }
                        }
                    }
                }
            },
            where: {
                id: addTopicToSeasonInput.seasonId
            }
        })
    }
}
