import { Injectable } from '@nestjs/common'
import { PaginationInput } from '../common/page/pagination.input'
import { PrismaService } from '../prisma/prisma.service'
import { CreateContestInput } from './dto/create-contest.input'
import { UpdateContestInput } from './dto/update-contest.input'
import { Contest } from './entities/contest.entity'
import { FilterContestInput } from './dto/filter-contest.input'
import { PaginationContest } from '../common/page/pagination-info'
import { ContestRepository } from './contest.repository'

@Injectable()
export class ContestService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly contestRepository: ContestRepository,
    ) {}

  async create(contestInput: CreateContestInput): Promise<Contest> {
   return this.contestRepository.create({contestInput})
  }

  async findAll(
    filterContestInput: FilterContestInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<Contest[]> {
     return this.contestRepository.findAll({
      skip, 
      take,
      where: filterContestInput
    })
    
  }

  async findOne(contestId: string): Promise<Contest> {
    return this.contestRepository.findOne({contestId})
  }

  async update(condition:string, updateContest: UpdateContestInput): Promise<Contest> {
    return this.contestRepository.update({condition, updateContest})
  }

  // async removeProblemFromContest(contestId: string, problemId: string): Promise<Contest> {
  //   return this.prismaService.contest.update({
  //     where: {
  //       id: contestId,
  //     },
  //     data: {
  //       problems: {
  //         disconnect: {
  //           id: problemId,
  //         },
  //       },
  //     },
  //     include: {
  //       problems: true,
  //       groupContests: {
  //         include: {
  //           group: true,
  //         },
  //       },
  //       userContests: true,
  //     },
  //   })
  // }

  async remove(id: string): Promise<number> {
    try {
      await this.contestRepository.remove({id})
    } catch (e) {
      console.log(`Fail to delete contest with id ${id}`, ' : ', e)
      throw new Error(`Fail to delete contest with id ${id}`)
    }
    return 1
  }
}
