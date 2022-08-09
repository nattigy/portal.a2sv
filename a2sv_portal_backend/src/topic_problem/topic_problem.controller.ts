import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { TopicProblemService } from './topic_problem.service';
import { CreateTopicProblemDto } from './dto/create-topic_problem.dto';
import { RemoveTopicProblemDto } from './dto/remove-topic_problem.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProblemEntity } from '../problem/entities/problem.entity';

@Controller('topic-problem')
@ApiTags('topic-problem')
export class TopicProblemController {
  constructor(private readonly topicProblemService: TopicProblemService) {}

  @Post()
  @ApiOkResponse()
  async addProblemToTopic(
    @Body() createTopicProblemDto: CreateTopicProblemDto,
  ) {
    return await this.topicProblemService.addProblemToTopic(
      createTopicProblemDto,
    );
  }

  @Get('problems/:id')
  @ApiOkResponse()
  async getAllProblemsByTopic(
    @Param('id', ParseIntPipe) id: number,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const problems = await this.topicProblemService.getAllProblemsByTopic(
      id,
      paginationQuery,
    );
    return problems.map((res) => new ProblemEntity(res));
  }

  @Delete()
  @ApiOkResponse()
  removeProblemFromTopic(@Body() removeTopicProblemDto: RemoveTopicProblemDto) {
    this.topicProblemService.removeProblemFromtopic(removeTopicProblemDto);
    return { message: 'successfully deleted' };
  }
}
