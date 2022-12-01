import { Injectable } from '@nestjs/common';
import { CreateGroupSeasonContestInput } from './dto/create-group-season-contest.input';
import { UpdateGroupSeasonContestInput } from './dto/update-group-season-contest.input';

@Injectable()
export class GroupSeasonContestService {
  create(createGroupSeasonContestInput: CreateGroupSeasonContestInput) {
    return 'This action adds a new groupSeasonContest';
  }

  findAll() {
    return `This action returns all groupSeasonContest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupSeasonContest`;
  }

  update(id: number, updateGroupSeasonContestInput: UpdateGroupSeasonContestInput) {
    return `This action updates a #${id} groupSeasonContest`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupSeasonContest`;
  }
}
