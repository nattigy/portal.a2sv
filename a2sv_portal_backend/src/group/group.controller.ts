import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiTags, ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { GroupEntity } from './entities/group.entity';

@Controller('group')
@ApiTags('Group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiResponse({ status: 201, type: GroupEntity })
  async create(@Body() createGroupDto: CreateGroupDto) {
    return new GroupEntity(await this.groupService.create(createGroupDto));
  }

  @Get()
  @ApiOkResponse({ status: 200, type: GroupEntity, isArray: true })
  async findAll() {
    const groups = await this.groupService.findAll();
    return groups.map((group) => new GroupEntity(group));
  }

  @Get(':id')
  @ApiOkResponse({ status: 200, type: GroupEntity })
  async findOne(@Param('id') id: string) {
    return new GroupEntity(await this.groupService.findOne(id.toString()));
  }

  @Patch(':id')
  @ApiOkResponse({ type: GroupEntity })
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return new GroupEntity(
      await this.groupService.update(id.toString(), updateGroupDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ status: 200, type: GroupEntity })
  async remove(@Param('id') id: string) {
    const deleted = await this.groupService.remove(id);
    return { message: 'successfully deleted' };
  }
}
