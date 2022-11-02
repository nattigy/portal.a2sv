import { Injectable } from '@nestjs/common'
import { CreateUserContestInput } from './dto/create-user-contest.input'
import { UpdateUserContestInput } from './dto/update-user-contest.input'
import { PrismaService } from '../prisma.service'

@Injectable()
export class UserContestService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserContestInput: CreateUserContestInput) {
    return this.prismaService.userContest.create({
      data: createUserContestInput,
    })
  }

  findAll() {
    return `This action returns all userContest`
  }

  findOne(id: number) {
    return `This action returns a #${id} userContest`
  }

  async update({ userId, contestId, ...updates }: UpdateUserContestInput) {
    return this.prismaService.userContest.upsert({
      where: {
        userId_contestId: {
          userId,
          contestId,
        },
      },
      create: {
        contest: {
          connect: {
            id: contestId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      update: updates,
    })
  }

  remove(id: number) {
    return `This action removes a #${id} userContest`
  }
}
