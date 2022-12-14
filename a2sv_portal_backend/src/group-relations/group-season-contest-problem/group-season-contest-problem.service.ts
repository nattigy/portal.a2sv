import { Injectable } from '@nestjs/common';
import { CreateGroupSeasonContestProblemInput } from './dto/create-group-season-contest-problem.input';
import { UpdateGroupSeasonContestProblemInput } from './dto/update-group-season-contest-problem.input';

@Injectable()
export class GroupSeasonContestProblemService {
  create(createGroupSeasonContestProblemInput: CreateGroupSeasonContestProblemInput) {
    return 'This action adds a new groupSeasonContestProblem';
  }

  findAll() {
    return `This action returns all groupSeasonContestProblem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupSeasonContestProblem`;
  }

  update(id: number, updateGroupSeasonContestProblemInput: UpdateGroupSeasonContestProblemInput) {
    return `This action updates a #${id} groupSeasonContestProblem`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupSeasonContestProblem`;
  }
}
