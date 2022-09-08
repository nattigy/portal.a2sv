import { Injectable } from '@nestjs/common';
import { CreateGroupTopicProblemUserInput } from './dto/create-group-topic-problem-user.input';
import { UpdateGroupTopicProblemUserInput } from './dto/update-group-topic-problem-user.input';

@Injectable()
export class GroupTopicProblemUserService {
  create(createGroupTopicProblemUserInput: CreateGroupTopicProblemUserInput) {
    return 'This action adds a new groupTopicProblemUser';
  }

  findAll() {
    return `This action returns all groupTopicProblemUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupTopicProblemUser`;
  }

  update(id: number, updateGroupTopicProblemUserInput: UpdateGroupTopicProblemUserInput) {
    return `This action updates a #${id} groupTopicProblemUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupTopicProblemUser`;
  }
}
