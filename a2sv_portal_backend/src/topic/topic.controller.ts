import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { ApiTags } from '@nestjs/swagger';
import { TopicEntity } from './entities/topic.entity';

@Controller('topic')
@ApiTags('Topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  async create(@Body() createTopicDto: CreateTopicDto) {
    return new TopicEntity(await this.topicService.create(createTopicDto));
  }

  @Get()
  async findAll() {
    const topics = await this.topicService.findAll();
    return topics.map((topic) => new TopicEntity(topic));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new TopicEntity(await this.topicService.findOne(+id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTopicDto: UpdateTopicDto,
  ) {
    return new TopicEntity(await this.topicService.update(+id, updateTopicDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = new TopicEntity(await this.topicService.remove(+id));
    return { message: 'successfully deleted' };
  }
}
