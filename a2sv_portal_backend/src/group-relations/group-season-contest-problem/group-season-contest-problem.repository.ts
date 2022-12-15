// import { Injectable } from '@nestjs/common'
// import { PrismaService } from '../../prisma/prisma.service'
// import { Prisma } from '@prisma/client'
// import { GroupSeasonContestProblem } from './entities/group-season-contest-problem.entity'

// @Injectable()
// export class GroupSeasonContestProblemRepository {
//   include = {
//     userGroupSeasonContestProblems: {
//       include: {
//         problem: { include: { tags: true } },
//       }
//     },
//     problem: { include: { tags: true } }
//   }

//   constructor(private readonly prismaService: PrismaService) {}

//   async create(
//     data: Prisma.GroupSeasonContestProblemCreateInput,
//   ): Promise<GroupSeasonContestProblem> {
//     return this.prismaService.groupSeasonContestProblem.create({
//       data,
//       include:  {
//         // userGroupSeasonContestProblems: {
//         //   include: {
//         //     problem: { include: { tags: true } },
//         //   }
//         // },
//         problem: { include: { tags: true } },
//       },
//     })
//   }

//   async count(where?: Prisma.GroupSeasonContestProblemWhereInput): Promise<number> {
//     return this.prismaService.groupSeasonContestProblem.count({ where })
//   }

//   async findAll(params: {
//     skip?: number
//     take?: number
//     where?: Prisma.GroupSeasonContestProblemWhereInput
//     orderBy?: Prisma.GroupSeasonContestProblemOrderByWithRelationInput
//   }): Promise<GroupSeasonContestProblem[]> {
//     const { skip, take, where, orderBy } = params
//     return this.prismaService.groupSeasonContestProblem.findMany({
//       skip, take, where, orderBy,
//       include: this.include,
//     })
//   }

//   async findOne(
//     where: Prisma.GroupSeasonContestProblemWhereUniqueInput,
//   ): Promise<GroupSeasonContestProblem> {
//     return this.prismaService.groupSeasonContestProblem.findUnique({
//       where,
//       include: this.include,
//     })
//   }

//   async update(params: {
//     where: Prisma.GroupSeasonContestProblemWhereUniqueInput
//     data:
//       | Prisma.GroupSeasonContestProblemUpdateInput
//       | Prisma.GroupSeasonContestProblemUncheckedUpdateInput
//   }): Promise<GroupSeasonContestProblem> {
//     const { where, data } = params
//     return this.prismaService.groupSeasonContestProblem.update({
//       data,
//       where,
//       include: this.include,
//     })
//   }

//   async remove(where: Prisma.GroupSeasonContestProblemWhereUniqueInput) {
//     return this.prismaService.groupSeasonContestProblem.delete({ where })
//   }
// }
