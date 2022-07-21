import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TopicProblemService } from './topic_problem.service';
import { CreateTopicProblemDto } from './dto/create-topic_problem.dto';
import { UpdateTopicProblemDto } from './dto/update-topic_problem.dto';

@Controller('topic-problem')
export class TopicProblemController {
  constructor(private readonly topicProblemService: TopicProblemService) {}

  @Post()
  create(@Body() createTopicProblemDto: CreateTopicProblemDto) {
    return this.topicProblemService.create(createTopicProblemDto);
  }

  @Get()
  findAll() {
    return this.topicProblemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.topicProblemService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTopicProblemDto: UpdateTopicProblemDto,
  ) {
    return this.topicProblemService.update(id, updateTopicProblemDto);
  }

  @Delete(':id', ParseIntPipe)
  remove(@Param('id') id: number) {
    return this.topicProblemService.remove(id);
  }
}
