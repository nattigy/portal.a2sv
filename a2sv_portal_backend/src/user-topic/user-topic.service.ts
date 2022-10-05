import { Injectable } from '@nestjs/common';
import { CreateUserTopicInput } from './dto/create-user-topic.input';
import { UpdateUserTopicInput } from './dto/update-user-topic.input';

@Injectable()
export class UserTopicService {
  create(createUserTopicInput: CreateUserTopicInput) {
    return 'This action adds a new userTopic';
  }

  findAll() {
    return `This action returns all userTopic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userTopic`;
  }

  update(id: number, updateUserTopicInput: UpdateUserTopicInput) {
    return `This action updates a #${id} userTopic`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTopic`;
  }
}
