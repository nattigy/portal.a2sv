import { Injectable } from '@nestjs/common'
import { PaginationInput } from '../common/page/pagination.input'
import { PrismaService } from '../prisma/prisma.service'
import { CreateContestInput } from './dto/create-contest.input'
import { UpdateContestInput } from './dto/update-contest.input'
import { Contest } from './entities/contest.entity'
import { FilterContestInput } from './dto/filter-contest.input'
import { ContestRepository } from './contest.repository'
import { PaginationContest } from 'src/common/page/pagination-info'

@Injectable()
export class ContestService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly contestRepository: ContestRepository,
  ) {}

  async createContest({ problems, ...contestInput }: CreateContestInput): Promise<Contest> {
    
    return this.contestRepository.create({
      ...contestInput,
      problems: { connect: problems.map(p => ({ id: p.problemId })) },
    })
  }

  async contests(
    filterContestInput: FilterContestInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationContest> {
    const listContest = await this.contestRepository.findAll({
      skip,
      take,
      where: filterContestInput,
    })
    const count = await this.contestRepository.count(filterContestInput)
    return {
      items: listContest,
      pageInfo: {
        skip,
        count,
        take,
      },
    }
  }

  async contest(contestId: string): Promise<Contest> {
    // TODO: check if contest with this Id exists and if it doesn't return
    // TODO: "constest with this Id doesn't" exists error
    return this.contestRepository.findOne({ id: contestId })
  }

  async update(
    condition: string,
    { problems, ...updateContest }: UpdateContestInput,
  ): Promise<Contest> {
    // TODO: check if contest with this Id exists and if it doesn't return
    // TODO: "constest with this Id doesn't" exists error
    return this.contestRepository.update({
      where: { id: condition },
      data: {
        ...updateContest,
        problems: {
          connect: problems.map(p => ({ id: p.problemId })),
        },
      },
    })
  }

  async removeProblemsFromContest(contestId: string, problemId: string[]): Promise<Contest> {
    // TODO: check if contest with this Id exists and if it doesn't return
    // TODO: "constest with this Id doesn't" exists error
    // TODO: check if problem with this Id exists and if it doesn't return
    // TODO: "problem with this Id doesn't" exists error
    return this.contestRepository.update({
      where: { id: contestId },
      data: {
        problems: {
          disconnect: {
            // id:problemId,
          },
        },
      },
    })
    // return this.prismaService.contest.update({
    //   where: {
    //     id: contestId,
    //   },
    //   data: {
    //     problems: {
    //       disconnect: {
    //         id: problemId,
    //       },
    //     },
    //   },
    //   include: {
    //     problems: true,
    //     groupContests: {
    //       include: {
    //         group: true,
    //       },
    //     },
    //     userContests: true,
    //   },
    // })
  }

  async removeContest(id: string): Promise<number> {
    try {
      await this.contestRepository.remove({ id })
    } catch (e) {
      console.log(`Fail to delete contest with id ${id}`, ' : ', e)
      throw new Error(`Fail to delete contest with id ${id}`)
    }
    return 1
  }
}
