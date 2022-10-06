import {Injectable, NotFoundException} from '@nestjs/common'
import {PrismaService} from 'src/prisma.service'
import {Topic} from '@prisma/client'
import {CreateTopicInput} from './dto/create-topic.input'
import {UpdateTopicInput} from './dto/update-topic.input'
import {AddTopicToGroupInput} from './dto/add-topic-to-group-input'

@Injectable()
export class TopicService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async getTopics(params: {
        skip?: number
        take?: number
        groupId?: number
        seasonId?: number
    }): Promise<Topic[] | []> {
        const {skip, take, groupId, seasonId} = params
        return this.prismaService.topic.findMany({
            skip,
            take,
            where: {
                seasonGroups: {
                    some: {
                        groupId,
                        seasonId
                    },
                },
            },
            include: {
                seasonGroups: {
                    include: {
                        group: true,
                    },
                },
            },
        })
    }

    async getTopicById(id: number): Promise<Topic> {
        const topic = await this.prismaService.topic.findUnique({
            where: {id: id},
            include: {
                seasonGroups: {
                    include: {
                        topic: true,
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
                seasonGroups: {
                    include: {
                        group: true,
                    },
                },
            },
        })
    }

    async updateTopic(
        givenId: number,
        updateTopicInput: UpdateTopicInput,
    ): Promise<Topic> {
        const {id, ...data} = updateTopicInput
        const queryData = data as any
        return this.prismaService.topic.update({
            where: {id: id},
            data: queryData,
            include: {
                seasonGroups: {
                    include: {
                        group: true,
                    },
                },
            },
        })
    }

    async deleteTopic(id: number): Promise<Topic> {
        return this.prismaService.topic.delete({where: {id}})
    }

    async addTopicToGroup(addTopicToGroupInput: AddTopicToGroupInput) {
        return this.prismaService.groupTopicSeason.create({
            data: addTopicToGroupInput,
        })
    }
}
