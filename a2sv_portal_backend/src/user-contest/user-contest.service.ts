import { Injectable } from '@nestjs/common';
import { CreateUserContestInput } from './dto/create-user-contest.input';
import { UpdateUserContestInput } from './dto/update-user-contest.input';

@Injectable()
export class UserContestService {
  create(createUserContestInput: CreateUserContestInput) {
    return 'This action adds a new userContest';
  }

  findAll() {
    return `This action returns all userContest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userContest`;
  }

  update(id: number, updateUserContestInput: UpdateUserContestInput) {
    return `This action updates a #${id} userContest`;
  }

  remove(id: number) {
    return `This action removes a #${id} userContest`;
  }
}
