import { Injectable, NotFoundException } from '@nestjs/common'
import { PaginationGroup } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { CreateGroupInput } from './dto/create-group.input'
import { FilterGroupInput } from './dto/filter-group.input'
import { UpdateGroupInput } from './dto/update-group.input'
import { Group } from './entities/group.entity'
import { GroupRepository } from './group.repository'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class GroupsService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly prismaService: PrismaService,
  ) {
  }

  async createGroup(createGroupInput: CreateGroupInput): Promise<Group> {
    return this.groupRepository.create(createGroupInput)
  }

  async group(id: string): Promise<Group> {
    return this.groupRepository.findOne({ id })
  }

  async groups(
    filterGroupInput: FilterGroupInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationGroup> {
    const count = await this.groupRepository.count(filterGroupInput)
    const groups = await this.groupRepository.findAll({
      skip,
      take,
      where: filterGroupInput,
      orderBy: {},
    })
    return {
      items: groups,
      pageInfo: { skip, count, take },
    }
  }

  // async groupsPagination(
  //   filterGroupInput: FilterGroupInput,
  //   {skip, take}: PaginationInfoInput,
  //   userPaginationInput: PaginationInfoInput = {take: 100, skip: 0},
  // ): Promise<GroupsPaginated> {
  //   const groupsCount = (
  //     await this.prismaService.group.findMany({
  //       where: filterGroupInput,
  //     })
  //   ).length
  //   const groups = await this.prismaService.group.findMany({
  //     where: filterGroupInput,
  //     skip,
  //     take,
  //     include: {
  //       users: {
  //         take: userPaginationInput.take,
  //         skip: userPaginationInput.skip,
  //       },
  //       head: true,
  //     },
  //   })
  //
  //   const groupsUsersPaginated: GroupsUsersPaginated[] = []
  //
  //   for (let i = 0; i < groups.length; i++) {
  //     const users = (
  //       await this.prismaService.group.findUnique({
  //         where: {
  //           id: groups[i].id,
  //         },
  //         include: {
  //           users: true,
  //         },
  //       })
  //     ).users
  //     groupsUsersPaginated.push({
  //       group: groups[i],
  //       pageInfo: {
  //         skip: userPaginationInput.skip,
  //         take: userPaginationInput.take,
  //         count: users.length,
  //       },
  //     })
  //   }
  //
  //   return {
  //     items: groupsUsersPaginated,
  //     pageInfo: {
  //       skip,
  //       take,
  //       count: groupsCount,
  //     },
  //   }
  // }

  async updateGroup({ id, ...updates }: UpdateGroupInput): Promise<Group> {
    const newUpdates: Prisma.GroupUpdateInput | Prisma.GroupUncheckedUpdateInput = { ...updates, head: null }
    if (updates.headId) {
      const getHead = await this.prismaService.user.findUnique({ where: { id: updates.headId } })
      if (!getHead) {
        throw new NotFoundException(`User with id:${updates.headId} not found`)
      }
      newUpdates.head = {
        connect: {
          id: updates.headId,
        },
      }
    }
    return this.groupRepository.update({
      where: { id },
      data: newUpdates,
    })
  }

  // async calculateGroupStat(group: Group): Promise<GroupStatResponse> {
  //   let numberOfAcceptedSubmissions = 0
  //   let numberOfWrongSubmissions = 0
  //   let totalTimeDedicated = 0
  //   let numberOfTopicsCovered = 0
  //   let numberOfProblems = 0
  //   const contestsAttended = group.groupContests.length
  //   group.users.forEach(u => {
  //     u.seasonTopicProblems.forEach(g => {
  //       if (group.seasons.length > 0 && g.seasonId == group.seasons[0].id) {
  //         if (g.solved) numberOfAcceptedSubmissions += 1
  //         numberOfWrongSubmissions += g.attempts
  //         totalTimeDedicated += g.timeDedicated
  //       }
  //     })
  //   })
  //   group.seasons.forEach(s => {
  //     numberOfTopicsCovered += s.seasonTopics.length
  //     s.seasonTopics.forEach(t => {
  //       numberOfProblems += t.problems.length
  //     })
  //   })
  //   return {
  //     id: group.id,
  //     name: group.name,
  //     createdAt: group.createdAt,
  //     country: group.country,
  //     school: group.school,
  //     numberOfStudents: group.users?.length,
  //     numberOfTopicsCovered: numberOfTopicsCovered,
  //     topicsCoverage: numberOfTopicsCovered,
  //     // topics.length
  //     // ? (numberOfTopicsCovered / topics.length) * 100
  //     // : 0,
  //     numberOfAcceptedSubmissions: numberOfAcceptedSubmissions,
  //     numberOfWrongSubmissions: numberOfWrongSubmissions,
  //     totalTimeDedicated: totalTimeDedicated,
  //     numberOfProblems: numberOfProblems,
  //     contestsAttended: contestsAttended,
  //     // rank: groups[i].id,
  //   }
  // }
  //
  // async groupStat(groupId: string): Promise<GroupStatResponse> {
  //   const group = await this.prismaService.group.findUnique({
  //     where: {
  //       id: groupId,
  //     },
  //     include: {
  //       users: {
  //         include: {
  //           seasonTopicProblems: true,
  //         },
  //       },
  //       seasons: {
  //         take: 1,
  //         where: {
  //           isActive: true,
  //         },
  //         include: {
  //           seasonTopics: {
  //             include: {
  //               problems: true,
  //             },
  //           },
  //         },
  //       },
  //       groupContests: true,
  //     },
  //   })
  //   if (!group) {
  //     throw new NotFoundException(`Group not found`)
  //   }
  //   return this.calculateGroupStat(group)
  // }
  //
  // async groupsStat(
  //   filterGroupInput: FilterGroupInput,
  //   {skip, take}: PaginationInfoInput = {take: 50, skip: 0},
  // ): Promise<GroupStatResponsePage<GroupStatResponse>> {
  //   const groupStatResponses: GroupStatResponse[] = []
  //   const groupCount = (
  //     await this.prismaService.group.findMany({
  //       where: filterGroupInput,
  //       select: {
  //         id: true,
  //       },
  //     })
  //   ).length
  //   const groups = await this.prismaService.group.findMany({
  //     skip,
  //     take,
  //     where: filterGroupInput,
  //     include: {
  //       users: {
  //         include: {
  //           seasonTopicProblems: true,
  //         },
  //       },
  //       seasons: {
  //         take: 1,
  //         where: {
  //           isActive: true,
  //         },
  //         include: {
  //           seasonTopics: {
  //             include: {
  //               problems: true,
  //             },
  //           },
  //         },
  //       },
  //       groupContests: true,
  //     },
  //   })
  //   if (!groups) {
  //     throw new NotFoundException(`No groups found`)
  //   }
  //   for (let i = 0; i < groups.length; i++) {
  //     groupStatResponses.push(await this.calculateGroupStat(groups[i]))
  //   }
  //   return {
  //     items: groupStatResponses,
  //     pageInfo: {
  //       skip,
  //       take,
  //       count: groupCount,
  //     },
  //   }
  // }

  async removeGroup(id: string): Promise<number> {
    try {
      await this.groupRepository.remove({ id })
    } catch (e) {
      console.log(`Fail to delete group with id ${id}`, ' : ', e)
      throw new Error(`Fail to delete group with id ${id}`)
    }
    return 1
  }
}
