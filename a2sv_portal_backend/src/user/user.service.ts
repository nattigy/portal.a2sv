import {Injectable, NotFoundException} from '@nestjs/common'
import {Status, RoleEnum, User} from '@prisma/client'
import {CreateUserInput} from './dto/create-user.input'
import {UpdateUserInput} from './dto/update-user.input'
import * as bcrypt from 'bcrypt'
import {Parent} from '@nestjs/graphql'
import {PrismaService} from '../prisma.service'
import {ComfortLevel} from './entities/comfort-level.enum'

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async create(createUserInput: CreateUserInput): Promise<User> {
        const {email, password} = createUserInput

        const foundUser = await this.prismaService.user.findFirst({
            include: {
                group: true,
                headToGroup: true,
                userProfile: true,
                seasonTopicProblems: true,
                topics: {
                    include: {
                        topic: true,
                    },
                },
            },
            where: {email},
        })

        if (foundUser) throw new Error('Email is already in use')

        const saltOrRounds = 10
        const hash = await bcrypt.hash(password, saltOrRounds)

        return this.prismaService.user.create({
            data: {
                email,
                password: hash,
                status: Status.ACTIVE,
                role: createUserInput.role,
                updatedAt: new Date().toISOString(),
            },
            include: {
                group: true,
                userProfile: true,
                headToGroup: true,
                seasonTopicProblems: true,
                topics: {
                    include: {
                        topic: true,
                    },
                },
            },
        })
    }

    async findAll(params: {
        skip?: number
        take?: number
        status?: Status
        email?: string
        groupId?: string
        role?: RoleEnum
    }): Promise<User[] | []> {
        const {skip, take, status, email, groupId, role} = params

        const result = await this.prismaService.user.findMany({
            skip,
            take,
            where: {
                groupId,
                status,
                email,
                role,
            },
            include: {
                group: true,
                userProfile: true,
                headToGroup: true,
                seasonTopicProblems: true,
                topics: {
                    include: {
                        topic: true,
                    },
                },
            },
        })

        return result
    }

    async findOne(id: string) {
        const user = await this.prismaService.user.findUnique({
            include: {
                group: true,
                userProfile: true,
                headToGroup: true,
                seasonTopicProblems: true,
                topics: {
                    include: {
                        topic: true,
                    },
                },
            },
            where: {
                id: id,
            },
        })
        if (!user) throw new NotFoundException('User not found')
        return user
    }

    async getRole(@Parent() user: User) {
        return this.prismaService.role.findFirst({where: {id: '1'}})
    }

    async update(updateUserInput: UpdateUserInput): Promise<User> {
        // eslint-disable-next-line prefer-const
        let {id, seasonTopicProblems, groupId, userProfile, ...data} =
            updateUserInput
        const queryData = data as any

        if (groupId) {
            queryData.group = {
                connect: {id: groupId}
            }
        }
        if (seasonTopicProblems) {
            queryData.groupTopicProblems = {
                upsert: seasonTopicProblems.map((GroupTopicSeasonProblem) => {
                    const {problemId, topicId, ...groupTopicProblemData} =
                        GroupTopicSeasonProblem
                    return {
                        where: {
                            groupId_topicId_problemId_userId: {
                                groupId,
                                topicId,
                                problemId,
                                id,
                            },
                        },
                        create: {
                            // user: {
                            //   connect: {
                            //     id: id,
                            //   },
                            // },
                            GroupTopicSeasonProblem: {
                                connect: {
                                    problemId_groupId_topicId: {
                                        groupId,
                                        topicId,
                                        problemId,
                                    },
                                },
                            },
                            ...groupTopicProblemData,
                        },
                        update: groupTopicProblemData,
                    }
                }),
            }
            // queryData.groupTopicProblems = groupTopicProblems.map(
            //   (GroupTopicSeasonProblem) => {

            //     return {

            //     }
            //   },
            // )
        }
        if (userProfile) {
            {
                queryData.userProfile = {
                    upsert: {
                        update: userProfile,
                        create: userProfile,
                    },
                }
            }
        }
        return await this.prismaService.user.update({
            include: {
                group: true,
                userProfile: true,
                headToGroup: true,
                seasonTopicProblems: true,
                topics: {
                    include: {
                        topic: true,
                    },
                },
            },
            data: queryData,
            where: {id},
        })
    }

    async remove(id: string): Promise<User | null> {
        return await this.prismaService.user.delete({
            where: {id},
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.prismaService.user.findFirst({
            where: {email},
            include: {
                group: true,
                headToGroup: true,
                userProfile: true,
                topics: {
                    include: {
                        topic: true,
                    },
                },
            },
        })
    }

    async findById(id: string) {
        return await this.prismaService.user.findUnique({
            where: {
                id: id,
            },
            include: {
                group: true,
                headToGroup: true,
                userProfile: true,
                topics: {
                    include: {
                        topic: true,
                    },
                },
            },
        })
    }

    async updateComfortLevel(
        topicId: string,
        userId: string,
        comfortLevel: ComfortLevel,
    ) {
        return await this.prismaService.user.update({
            where: {
                id: userId,
            },
            data: {
                topics: {
                    upsert: {
                        where: {
                            userId_topicId: {
                                userId: userId,
                                topicId: topicId,
                            },
                        },
                        update: {
                            comfortLevel: comfortLevel,
                        },
                        create: {
                            topicId: topicId,
                            comfortLevel: comfortLevel,
                        },
                    },
                },
            },
            include: {
                topics: {
                    include: {
                        topic: true,
                    },
                },
            },
        })
    }
}
