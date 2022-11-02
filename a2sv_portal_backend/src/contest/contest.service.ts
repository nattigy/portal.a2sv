import { Injectable } from '@nestjs/common'
import { CreateContestInput } from './dto/create-contest.input'
import { UpdateContestInput } from './dto/update-contest.input'
import { PrismaService } from '../prisma.service'
import { GroupContest } from '../group-contest/entities/group-contest.entity'

@Injectable()
export class ContestService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ problems, ...createInput }: CreateContestInput) {
    return this.prismaService.contest.create({
      include: {
        problems: true,
      },
      data: {
        ...createInput,
        problems: {
          connect: problems,
        },
      },
    })
  }

  findAll() {
    return `This action returns all contest`
  }

  findOne(id: number) {
    return `This action returns a #${id} contest`
  }

  update(id: number, updateContestInput: UpdateContestInput) {
    return `This action updates a #${id} contest`
  }

  remove(id: number) {
    return `This action removes a #${id} contest`
  }

  async getGroupStats(id: string): Promise<GroupContest[]> {
    const contest = await this.prismaService.contest.findUnique({
      where: {
        id: id,
      },
      include: {
        groupContests: true,
      },
    })
    return contest.groupContests
  }
}
