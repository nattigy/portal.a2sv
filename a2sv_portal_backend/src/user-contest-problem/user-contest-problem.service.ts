import { Injectable } from '@nestjs/common';
import { CreateUserContestProblemInput } from './dto/create-user-contest-problem.input';
import { UpdateUserContestProblemInput } from './dto/update-user-contest-problem.input';
import {PrismaService} from "../prisma.service";
import {UserContestProblemEnum} from "./entities/user-contest-problem.entity";

@Injectable()
export class UserContestProblemService {
  constructor(private readonly prismaService: PrismaService) {
  }

  // create(createUserContestProblemInput: CreateUserContestProblemInput) {
  //   return this.prismaService.userContestProblem.create({
  //     data: createUserContestProblemInput
  //   })
  // }

  findAll() {
    return `This action returns all userContestProblem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userContestProblem`;
  }

  async update({userId, contestId, problemId, ...update}: UpdateUserContestProblemInput) {
    return this.prismaService.userContestProblem.upsert({
      include: {
        problem: true,
        contest: true,
        user: true,
      },
      where: {
        userId_contestId_problemId: {
          userId,
          contestId,
          problemId,
        }
      },
      create: {
        contest: {
          connect: {
            id: contestId
          }
        },
        user: {
          connect: {
            id: userId
          }
        },
        problem: {
          connect: {
            id: problemId
          }
        },
        numberOfAttempts: update.numberOfAttempts,
        numberOfMinutes: update.numberOfMinutes,
        status: update.status,
      },
      update: update,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} userContestProblem`;
  }
}
