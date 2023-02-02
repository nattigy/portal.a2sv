import { Injectable } from '@nestjs/common'
import { Prisma, UserTopicProblemStatusEnum } from '@prisma/client'
import { UserGroupSeasonDailyAnalytic } from 'dist/src/app/user-group-season-daily-analytics/entities/user-group-season-daily-analytic.entity'
import { PrismaService } from 'src/prisma/prisma.service'




@Injectable()
export class StudentDataAnalyticsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Prisma.UserGroupSeasonDailyAnalyticsCreateInput,
  ): Promise<UserGroupSeasonDailyAnalytic> {
    return this.prismaService.userGroupSeasonDailyAnalytics.create({
      data
    })
  }

  async count(where?: Prisma.UserGroupSeasonDailyAnalyticsWhereInput): Promise<number> {
    return this.prismaService.userGroupSeasonDailyAnalytics.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.UserGroupSeasonDailyAnalyticsWhereInput
    orderBy?: Prisma.UserGroupSeasonDailyAnalyticsOrderByWithRelationInput
  }): Promise<UserGroupSeasonDailyAnalytic[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.userGroupSeasonDailyAnalytics.findMany({
      skip,
      take,
      where,
      orderBy
    })
  }

  async findOne(
    where: Prisma.UserGroupSeasonDailyAnalyticsWhereUniqueInput,
  ): Promise<UserGroupSeasonDailyAnalytic> {
    return this.prismaService.userGroupSeasonDailyAnalytics.findUnique({
      where
    })
  }

  async update(params: {
    where: Prisma.UserGroupSeasonDailyAnalyticsWhereUniqueInput
    data: Prisma.UserGroupSeasonDailyAnalyticsUpdateInput
  }): Promise<UserGroupSeasonDailyAnalytic> {
    const { where, data } = params
    return this.prismaService.userGroupSeasonDailyAnalytics.update({
      data,
      where
    })
  }

//   async upsert(params: {
//     where: Prisma.UserGroupSeasonDailyAnalyticsWhereUniqueInput
//     data: Prisma.UserGroupSeasonDailyAnalyticsUpdateInput
//   }): Promise<UserGroupSeasonDailyAnalytic> {
//     const { where, data } = params
//     return this.prismaService.userGroupSeasonTopicProblem.upsert({
//       where,
//       create: {
//         userGroupSeasonTopic: {
//           connect: {
//             userId_groupId_seasonId_topicId: {
//               seasonId: where.userId_groupId_seasonId_topicId_problemId.seasonId,
//               topicId: where.userId_groupId_seasonId_topicId_problemId.topicId,
//               groupId: where.userId_groupId_seasonId_topicId_problemId.groupId,
//               userId: where.userId_groupId_seasonId_topicId_problemId.userId,
//             },
//           },
//         },
//         groupSeasonTopicProblem: {
//           connect: {
//             groupId_seasonId_topicId_problemId: {
//               seasonId: where.userId_groupId_seasonId_topicId_problemId.seasonId,
//               topicId: where.userId_groupId_seasonId_topicId_problemId.topicId,
//               groupId: where.userId_groupId_seasonId_topicId_problemId.groupId,
//               problemId: where.userId_groupId_seasonId_topicId_problemId.problemId,
//             },
//           },
//         },
//         problem: {
//           connect: { id: where.userId_groupId_seasonId_topicId_problemId.problemId },
//         },
//         solutionLink: data.solutionLink as string,
//         numberOfAttempts: data.numberOfAttempts as number,
//         numberOfMinutes: data.numberOfMinutes as number,
//         status: data.status as UserTopicProblemStatusEnum,
//       },
//       update: data,
//       include: {
//         problem: { include: { tags: true } },
//       },
//     })
//   }

  async upsert(params: {
    where: Prisma.UserGroupSeasonDailyAnalyticsWhereUniqueInput
    data: Prisma.UserGroupSeasonDailyAnalyticsUpdateInput
  }) {
    // Promise<UserGroupSeasonDailyAnalytic>
    const { where, data } = params
    // return this.prismaService.userGroupSeasonDailyAnalytics.upsert({
    //     // where,
    //     // // create:{
    //     // //     userGroupSeason:{
    //     // //         connect:{
    //     // //             // userId_groupId_seasonId:{
    //     // //             //     userId:where.userId_createdAt.userId
                        
    //     // //             // }
    //     // //         }
    //     // //     }
    //     // }
    // })

  }

//   async remove(where: Prisma.UserGroupSeasonDailyAnalyticsWhereInput) {
//     return this.prismaService.userGroupSeasonDailyAnalytics.delete({ where })
//   }
}

