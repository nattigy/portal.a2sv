import {Injectable, NotFoundException} from '@nestjs/common'
import {Status, RoleEnum, User} from '@prisma/client'
import {CreateUserInput} from './dto/create-user.input'
import {UpdateUserInput} from './dto/update-user.input'
import * as bcrypt from 'bcrypt'
import {Field, Float, InputType, Int, ObjectType, Parent} from '@nestjs/graphql'
import {PrismaService} from '../prisma.service'
import {ComfortLevel} from './entities/comfort-level.enum'
import {GroupsService} from "../group/groups.service";

@ObjectType()
export class StudentStat {
    @Field(() => Float)
    acceptanceRate: number
    @Field(() => Int)
    numberOfCorrectSubmissions: number
    @Field(() => Int)
    numberOfIncorrectSubmissions: number
    @Field(() => Int)
    totalTimeDedicated: number
    @Field(() => Float)
    uncomfortablity: number
    @Field(() => Int)
    easyCount: number
    @Field(() => Int)
    mediumCount: number
    @Field(() => Int)
    hardCount: number

}

@InputType()
export class TopicStudentStatInput {
    @Field()
    studentId: string
    @Field()
    seasonId: string
}

@ObjectType()
export class EachTopicCoverageStat {
    @Field()
    topicId: string
    @Field(() => Float)
    topicCoverage: number
}

@ObjectType()
export class TopicCoverageStat {
    @Field(() => [EachTopicCoverageStat])
    eachTopicCoverageStat: EachTopicCoverageStat[]
    @Field(() => Float)
    totalTopicCoverage: number
    @Field(() => Float)
    uncomfortability: number
}

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService, private readonly groupService: GroupsService) {
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

    async studentStats(id: string): Promise<StudentStat> {
        const user = await this.findById(id)
        if (!user) {
            throw new NotFoundException(`User with ${id} not found`)
        }
        const groupId = user.groupId
        if (!groupId) {
            throw new NotFoundException(`Group for User with ${id} not found`)
        }
        const group = await this.groupService.getGroupById(groupId)
        const seasons = group.seasons

        let numberOfCorrectSubmissions = 0
        let totalTimeDedicated = 0
        let totalAttempts = 0
        let unableToSolve = 0
        let uncomfortablity = 100
        let acceptanceRate = 0
        let totalQuestions = 0
        let easyCount = 0;
        let mediumCount = 0;
        let hardCount = 0

        for (const season of seasons) {
            for (const topic of season.topics) {
                totalQuestions += topic.problems.length
                for (const p of topic.problems) {
                    for (const userProblem of p.users) {
                        if (userProblem.userId === id) {
                            if (userProblem.solved) {
                                numberOfCorrectSubmissions++
                                switch (userProblem.seasonTopicProblem.problem.difficulty.toUpperCase()) {
                                    case 'EASY':
                                        easyCount++
                                        break
                                    case 'HARD':
                                        hardCount++
                                        break
                                    default:
                                        mediumCount++
                                }
                            }
                            totalAttempts += userProblem.attempts
                            totalTimeDedicated += userProblem.timeDedicated
                            if (userProblem.needHelp) unableToSolve++
                        }
                    }
                }
            }
        }
        if (numberOfCorrectSubmissions) {
            uncomfortablity = (unableToSolve / numberOfCorrectSubmissions) * 100
        }

        const numberOfIncorrectSubmissions = totalAttempts - numberOfCorrectSubmissions
        if (totalAttempts) {
            acceptanceRate = (numberOfCorrectSubmissions / totalAttempts) * 100
        }


        return {
            acceptanceRate,
            numberOfCorrectSubmissions,
            numberOfIncorrectSubmissions,
            totalTimeDedicated,
            uncomfortablity,
            easyCount,
            mediumCount,
            hardCount
        } as StudentStat

    }

    async studentTopicStats({studentId, seasonId}: TopicStudentStatInput): Promise<TopicCoverageStat> {
        const eachTopicCoverageStat = []
        let totalTopicCoverage = 0
        let totalNumberOfTopics = 0
        let sumOfEachTopicsCoverage = 0

        const user = await this.findById(studentId)
        const group = await this.groupService.getGroupById(user.groupId)
        const seasonIndex = group.seasons.findIndex((s, index) => s.id === seasonId)
        if (seasonIndex == -1) {
            throw new NotFoundException(`Season with ${seasonId} not found`)
        }
        const season = group.seasons[seasonIndex]
        let unableToSolve = 0
        let totalQuestions = 0
        let totalNotSolved = 0

        for (const seasonTopic of season.topics) {
            let totalTopicQuestions = 0
            let numberOfSolvedProblems = 0
            totalNumberOfTopics++
            for (const problem of seasonTopic.problems) {
                for (const userProblem of problem.users) {
                    if (userProblem.userId === studentId) {
                        totalTopicQuestions++
                        if (userProblem.solved) numberOfSolvedProblems++
                        if (userProblem.needHelp) unableToSolve++
                    }
                }
            }
            totalQuestions += totalTopicQuestions
            totalNotSolved += (totalTopicQuestions - numberOfSolvedProblems)

            eachTopicCoverageStat.push({
                topicId: seasonTopic.topicId,
                questionCoverage: 0,
                topicCoverage: (numberOfSolvedProblems / totalTopicQuestions) * 100
            })
            sumOfEachTopicsCoverage += eachTopicCoverageStat[seasonTopic.topicId]
        }

        totalTopicCoverage = sumOfEachTopicsCoverage / totalNumberOfTopics
        const uncomfortability = (unableToSolve / (totalQuestions - totalNotSolved)) * 100
        return {
            eachTopicCoverageStat,
            totalTopicCoverage,
            uncomfortability
        }
    }
}
