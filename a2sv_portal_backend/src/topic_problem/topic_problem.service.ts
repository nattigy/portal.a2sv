import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTopicProblemDto } from './dto/create-topic_problem.dto';
import { RemoveTopicProblemDto } from './dto/remove-topic_problem.dto';

@Injectable()
export class TopicProblemService {
  constructor(private prismaService: PrismaService) {}

  async getAllProblemsByTopic(id: number, paginationQuery: PaginationQueryDto) {
    await this.findOne(id, undefined);
    const { limit, offset } = paginationQuery;
    const results = await this.prismaService.problemOnTopic.findMany({
      where: { topicId: id },
      include: { problem: { include: { ProblemOnTopic: true } } },
      skip: offset,
      take: limit,
    });

    const problems = results.map((result) => {
      const { ProblemOnTopic, ...problem } = result.problem;
      return problem;
    });
    return problems;
  }

  async findOne(topicId: number, problemId: number) {
    const problemOnTopic = await this.prismaService.problemOnTopic.findMany({
      where: { topicId: topicId, problemId: problemId },
    });
    if (problemOnTopic.length == 0) {
      throw new NotFoundException(
        `Topic #${topicId} and Problem #${problemId} not found`,
      );
    }

    return problemOnTopic;
  }

  addProblemToTopic(createTopicProblemDto: CreateTopicProblemDto) {
    return this.prismaService.problemOnTopic.create({
      data: createTopicProblemDto,
    });
  }

  async removeProblemFromtopic(removeTopicProblemDto: RemoveTopicProblemDto) {
    const { topic_id, problem_id } = removeTopicProblemDto;
    await this.findOne(topic_id, problem_id);

    return this.prismaService.problemOnTopic.deleteMany({
      where: {
        topicId: topic_id,
        problemId: problem_id,
      },
    });
  }
}
