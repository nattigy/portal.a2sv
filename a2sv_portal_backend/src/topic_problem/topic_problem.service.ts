import { Injectable } from '@nestjs/common';
import { CreateTopicProblemDto } from './dto/create-topic_problem.dto';
import { UpdateTopicProblemDto } from './dto/update-topic_problem.dto';

@Injectable()
export class TopicProblemService {
  create(createTopicProblemDto: CreateTopicProblemDto) {
    return 'This action adds a new topicProblem';
  }

  findAll() {
    return `This action returns all topicProblem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topicProblem`;
  }

  update(id: number, updateTopicProblemDto: UpdateTopicProblemDto) {
    return `This action updates a #${id} topicProblem`;
  }

  remove(id: number) {
    return `This action removes a #${id} topicProblem`;
  }
}
