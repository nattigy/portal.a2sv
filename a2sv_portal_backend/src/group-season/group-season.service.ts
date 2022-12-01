import { Injectable } from '@nestjs/common';
import { CreateGroupSeasonInput } from './dto/create-group-season.input';
import { UpdateGroupSeasonInput } from './dto/update-group-season.input';

@Injectable()
export class GroupSeasonService {
  create(createGroupSeasonInput: CreateGroupSeasonInput) {
    return 'This action adds a new groupSeason';
  }

  findAll() {
    return `This action returns all groupSeason`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupSeason`;
  }

  update(id: number, updateGroupSeasonInput: UpdateGroupSeasonInput) {
    return `This action updates a #${id} groupSeason`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupSeason`;
  }
}
