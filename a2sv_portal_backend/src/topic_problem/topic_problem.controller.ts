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
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('topic-problem')
@ApiTags('topic-problem')
export class TopicProblemController {
  constructor(private readonly topicProblemService: TopicProblemService) {}

  @Post()
  @ApiOkResponse()
  addProblemToTopic(@Body() createTopicProblemDto: CreateTopicProblemDto) {
    return this.topicProblemService.addProblemToTopic(createTopicProblemDto);
  }

  @Get('problems/:id')
  @ApiOkResponse()
  getAllProblemsByTopic(
    @Param('id', ParseIntPipe) id: number,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.topicProblemService.getAllProblemsByTopic(id, paginationQuery);
  }

  @Delete()
  @ApiOkResponse()
  removeProblemFromTopic(@Body() removeTopicProblemDto: RemoveTopicProblemDto) {
    this.topicProblemService.removeProblemFromtopic(removeTopicProblemDto);

    return { message: 'successfully deleted' };
  }
}
