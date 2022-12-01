import { Injectable } from '@nestjs/common';
import { CreateGroupSeasonTopicInput } from './dto/create-group-season-topic.input';
import { UpdateGroupSeasonTopicInput } from './dto/update-group-season-topic.input';

@Injectable()
export class GroupSeasonTopicService {
  create(createGroupSeasonTopicInput: CreateGroupSeasonTopicInput) {
    return 'This action adds a new groupSeasonTopic';
  }

  findAll() {
    return `This action returns all groupSeasonTopic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupSeasonTopic`;
  }

  update(id: number, updateGroupSeasonTopicInput: UpdateGroupSeasonTopicInput) {
    return `This action updates a #${id} groupSeasonTopic`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupSeasonTopic`;
  }
}
