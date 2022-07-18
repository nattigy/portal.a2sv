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
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { ApiTags } from '@nestjs/swagger';
import { TopicEntity } from './entities/topic.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('topic')
@ApiTags('Topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  async create(@Body() createTopicDto: CreateTopicDto) {
    return new TopicEntity(await this.topicService.create(createTopicDto));
  }

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    const topics = await this.topicService.findAll(paginationQuery);
    return topics.map((topic) => new TopicEntity(topic));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new TopicEntity(await this.topicService.findOne(+id));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTopicDto: UpdateTopicDto,
  ) {
    return new TopicEntity(await this.topicService.update(+id, updateTopicDto));
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.topicService.remove(+id);
    return { message: 'successfully deleted' };
  }
}
