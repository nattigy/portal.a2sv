import { Injectable } from '@nestjs/common'
import { CreateContestInput } from '../../app/contest/dto/create-contest.input'
import { Contest } from '../../app/contest/entities/contest.entity'
import { PrismaService } from '../../prisma/prisma.service'
import { ContestRepository } from '../../app/contest/contest.repository'

@Injectable()
export class ManageContestService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly contestRepository: ContestRepository,
  ) {}

  async createContest({
    problems,
    groups,
    ...contestInput
  }: CreateContestInput): Promise<Contest> {
    const contest = await this.contestRepository.create({
      ...contestInput,
      contestProblems: {
        createMany: {
          skipDuplicates: true,
          data: problems.map(p => ({ problemId: p })),
        },
      },
    })
    const groupSeasons = await this.prismaService.groupSeason.findMany({
      where: { groupId: { in: groups }, isActive: true },
    })
    await this.prismaService.groupSeasonContest.createMany({
      skipDuplicates: true,
      data: groupSeasons.map(g => ({
        groupId: g.groupId,
        contestId: contest.id,
        seasonId: g.seasonId,
        startTime: contestInput.startTime,
        endTime: contestInput.endTime,
      })),
    })
    return contest
  }

  async addProblemsToContest(contestId: string, problemIds: string[]): Promise<number> {
    return (
      await this.prismaService.contestProblem.createMany({
        skipDuplicates: true,
        data: problemIds.map(p => ({
          contestId,
          problemId: p,
        })),
      })
    ).count
  }

  async removeProblemsToContest(contestId: string, problemIds: string[]): Promise<number> {
    return (
      await this.prismaService.contestProblem.deleteMany({
        where: { contestId, problemId: { in: problemIds } },
      })
    ).count
  }
}
