import { Injectable } from '@nestjs/common';
import { CreateUserContestInput } from './dto/create-user-contest.input';
import { UpdateUserContestInput } from './dto/update-user-contest.input';
import {PrismaService} from "../prisma.service";

@Injectable()
export class UserContestService {
  constructor(private readonly prismaService: PrismaService) {
  }

  create(createUserContestInput: CreateUserContestInput) {
    return 'This action adds a new userContest';
  }

  findAll() {
    return `This action returns all userContest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userContest`;
  }

  update({userId, contestId, ...updates}: UpdateUserContestInput) {
    return this.prismaService.userContest.upsert({
      where: {
        userId_contestId: {
          userId,
          contestId
        }
      },
      create: {
        contest: {
          connect: {
            id: userId
          }
        },
        user: {
          connect: {
            id: contestId
          }
        }
      },
      update: updates
    })
  }

  remove(id: number) {
    return `This action removes a #${id} userContest`;
  }
}
