import { Injectable } from '@nestjs/common'
import { CreateContestInput } from '../../app/contest/dto/create-contest.input'
import { Contest } from '../../app/contest/entities/contest.entity'
import { PrismaService } from '../../prisma/prisma.service'
import { ContestService } from '../../app/contest/contest.service'

@Injectable()
export class ManageContestsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly contestService: ContestService,
  ) {}

  async createContest(createContestInput: CreateContestInput): Promise<Contest> {
    const contest = await this.contestService.createContest(createContestInput)
    const { groups, problems, ...create } = createContestInput
    const groupSeasons = await this.prismaService.groupSeason.findMany({
      where: { groupId: { in: groups }, isActive: true },
    })
    for (const problem of problems) {
      const { problemId, ...p } = problem
      await this.prismaService.contestProblem.upsert({
        where: { contestId_problemId: { contestId: contest.id, problemId } },
        create: {
          problem: {
            connectOrCreate: {
              where: { link: problem.link },
              create: {
                ...p,
                tags: {
                  connectOrCreate: [].map(t => ({
                    where: { name: t.name },
                    create: { name: t.name },
                  })),
                },
              },
            },
          },
          contest: { connect: { id: contest.id } },
        },
        update: {},
      })
    }
    // for (const groupSeason of groupSeasons) {
    //   await this.prismaService.groupSeasonContest.upsert({
    //     where: {},
    //     create: {},
    //     update: {}
    //   })
    // }
    // create groupSeasonContestProblems for each groupSeasonContests and contestProblems
    return contest
  }

  async addProblemsToContest(contestId: string, problemIds: string[]): Promise<number> {
    // get contest
    // get groupSeasonContests

    // create contestProblems
    // create groupSeasonContestProblems for each groupSeasonContests and contestProblems
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

  async removeProblemsFromContest(contestId: string, problemIds: string[]): Promise<number> {
    return (
      await this.prismaService.contestProblem.deleteMany({
        where: { contestId, problemId: { in: problemIds } },
      })
    ).count
  }
}
