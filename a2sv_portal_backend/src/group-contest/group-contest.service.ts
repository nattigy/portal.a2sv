import { Injectable } from '@nestjs/common';
import { CreateGroupContestInput } from './dto/create-group-contest.input';
import { UpdateGroupContestInput } from './dto/update-group-contest.input';

@Injectable()
export class GroupContestService {
  create(createGroupContestInput: CreateGroupContestInput) {
    return 'This action adds a new groupContest';
  }

  findAll() {
    return `This action returns all groupContest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupContest`;
  }

  update(id: number, updateGroupContestInput: UpdateGroupContestInput) {
    return `This action updates a #${id} groupContest`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupContest`;
  }
}
