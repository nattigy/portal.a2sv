import {Injectable, NotFoundException} from '@nestjs/common'
import {CreateGroupInput} from './dto/create-group.input'
import {Group} from './entities/group.entity'
import {UpdateGroupInput} from './dto/update-group.input'
import {PrismaService} from '../prisma.service'
import {Field, InputType, Int} from '@nestjs/graphql'

@InputType()
export class GroupWhereInput {
    @Field(() => Int, {nullable: true})
    id?: number
    @Field({nullable: true})
    name?: string
    @Field({nullable: true})
    country?: string
    @Field({nullable: true})
    school?: string
    @Field(() => Int, {nullable: true})
    seasonId?: number
    @Field(() => Int, {nullable: true})
    topicId?: number
    @Field(() => Int, {nullable: true})
    headId?: number
    @Field(() => Int, {nullable: true})
    take?: number
    @Field(() => Int, {nullable: true})
    skip?: number
}

@Injectable()
export class GroupsService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async createGroup(createGroupInput: CreateGroupInput): Promise<Group> {
        return this.prismaService.group.create({
            include: {
                users: true,
                head: true,
                seasons: {
                    include: {
                        topics: true
                    },
                },
            },
            data: createGroupInput,
        })
    }

    async getGroupById(id: string): Promise<Group> {
        const group = await this.prismaService.group.findUnique({
            include: {
                users: true,
                head: true,
                seasons: {
                    include: {
                        topics: true,
                    },
                },
            },
            where: {
                id,
            },
        })
        if (!group) {
            throw new NotFoundException(`Group with id ${id} not found`)
        }
        return group
    }

    async getGroups(filter?: GroupWhereInput): Promise<Group[]> {
        const {skip, take, topicId, ...where} = filter || {}
        return this.prismaService.group.findMany({
            skip,
            take,
            include: {
                users: true,
                head: true,
                seasons: {
                    include: {
                        topics: {
                            include: {
                                problems: {
                                    include: {
                                        problem: true,
                                    },
                                },
                            }
                        }
                    },
                },
            },
        })
    }

    async updateGroup(updateGroupInput: UpdateGroupInput): Promise<Group> {
        const {
            currentSeasonId,
            id,
            seasons: topics,
            users,
            head,
            headId,
            ...groupData
        } = updateGroupInput
        const queryData = groupData as any
        if (users) {
            queryData.users = {
                connect: users,
            }
        }
        if (topics) {
            queryData.seasonTopics = {
                connectOrCreate: topics.map((topic) => {
                    return {
                        where: {
                            seasonId_topicId: {
                                groupId: id,
                                seasonId: currentSeasonId,
                            },
                        },
                        create: {
                            season: {
                                connect: {
                                    id: currentSeasonId,
                                },
                            },
                        },
                    }
                }),
            }
        }
        if (head || headId) {
            queryData.head = {
                connect: {
                    id: head.id || headId,
                },
            }
        }

        return this.prismaService.group.update({
            where: {id: id},
            data: queryData,
            include: {
                seasons: {
                    include: {
                        topics: {
                            include: {
                                problems: true
                            }
                        },
                    },
                },
                users: true,
                head: true,
            },
        })
    }

    async deleteGroup(id: string): Promise<Group> {
        return this.prismaService.group.delete({
            where: {id},
        })
    }
}
