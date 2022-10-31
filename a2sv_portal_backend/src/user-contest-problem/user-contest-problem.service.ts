import { Injectable } from '@nestjs/common';
import { CreateUserContestProblemInput } from './dto/create-user-contest-problem.input';
import { UpdateUserContestProblemInput } from './dto/update-user-contest-problem.input';
import {PrismaService} from "../prisma.service";

@Injectable()
export class UserContestProblemService {
  constructor(private readonly prismaService: PrismaService) {
  }

  create(createUserContestProblemInput: CreateUserContestProblemInput) {
    return this.prismaService.userContestProblem.create({
      data: createUserContestProblemInput
    })
  }

  findAll() {
    return `This action returns all userContestProblem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userContestProblem`;
  }

  update(updateUserContestProblemInput: UpdateUserContestProblemInput) {
    return `This action updates a userContestProblem`;
  }

  remove(id: number) {
    return `This action removes a #${id} userContestProblem`;
  }
}
