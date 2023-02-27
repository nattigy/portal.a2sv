import { Injectable, NotFoundException } from '@nestjs/common'
import { PaginationInput } from '../../common/page/pagination.input'
import { UpdateContestInput } from './dto/update-contest.input'
import { Contest } from './entities/contest.entity'
import { FilterContestInput } from './dto/filter-contest.input'
import { ContestRepository } from './contest.repository'
import { PaginationContest } from 'src/common/page/pagination-info'
import { CreateContestInput } from './dto/create-contest.input'

@Injectable()
export class ContestService {
  constructor(private readonly contestRepository: ContestRepository) {}

  async createContest(createContestInput: CreateContestInput) {
    return this.contestRepository.create(createContestInput)
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
      pageInfo: { skip, count, take },
    }
  }

  async contest(contestId: string): Promise<Contest> {
    // check if contest with this Id exists and if it doesn't return
    // "contest with this Id doesn't" exists error
    const foundContest = await this.contestRepository.findOne({ id: contestId })

    if (!foundContest)
      throw new NotFoundException(`Contest with id ${contestId} does not exist!`)

    return foundContest
  }

  async update({ contestId, ...updateContest }: UpdateContestInput): Promise<Contest> {
    const foundContest = await this.contest(contestId)

    if (!foundContest)
      throw new NotFoundException(`Contest with id ${contestId} does not exist!`)

    return this.contestRepository.update({
      where: { id: contestId },
      data: updateContest,
    })
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
