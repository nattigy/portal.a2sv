import { Injectable } from '@nestjs/common';
import { CreateSeasonContestInput } from './dto/create-season-contest.input';
import { UpdateSeasonContestInput } from './dto/update-season-contest.input';

@Injectable()
export class SeasonContestService {
  create(createSeasonContestInput: CreateSeasonContestInput) {
    return 'This action adds a new seasonContest';
  }

  findAll() {
    return `This action returns all seasonContest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seasonContest`;
  }

  update(id: number, updateSeasonContestInput: UpdateSeasonContestInput) {
    return `This action updates a #${id} seasonContest`;
  }

  remove(id: number) {
    return `This action removes a #${id} seasonContest`;
  }
}
