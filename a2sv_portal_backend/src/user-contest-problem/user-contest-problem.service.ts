import { Injectable } from '@nestjs/common';
import { CreateUserContestProblemInput } from './dto/create-user-contest-problem.input';
import { UpdateUserContestProblemInput } from './dto/update-user-contest-problem.input';

@Injectable()
export class UserContestProblemService {
  create(createUserContestProblemInput: CreateUserContestProblemInput) {
    return 'This action adds a new userContestProblem';
  }

  findAll() {
    return `This action returns all userContestProblem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userContestProblem`;
  }

  update(id: number, updateUserContestProblemInput: UpdateUserContestProblemInput) {
    return `This action updates a #${id} userContestProblem`;
  }

  remove(id: number) {
    return `This action removes a #${id} userContestProblem`;
  }
}
