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
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiTags, ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { GroupEntity } from './entities/group.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('group')
@ApiTags('Group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiResponse({ status: 201, type: GroupEntity })
  async create(@Body() createGroupDto: CreateGroupDto) {
    return new GroupEntity(await this.groupService.create(createGroupDto));
  }

  @Get('batches')
  @ApiOkResponse({ type: GroupEntity, isArray: true })
  async findAllBatches(@Query() paginationQuery: PaginationQueryDto) {
    const groups = await this.groupService.findAllBatches(paginationQuery);
    return groups.map((group) => new GroupEntity(group));
  }

  @Get('batches/:id')
  @ApiOkResponse({ status: 200, type: GroupEntity })
  async findAllInBatches(@Param('id', ParseIntPipe) id: number) {
    const groups = await this.groupService.findAllInBatches(id);
    return groups.map((group) => new GroupEntity(group));
  }

  @Get()
  @ApiOkResponse({ status: 200, type: GroupEntity, isArray: true })
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    const groups = await this.groupService.findAll(paginationQuery);
    return groups.map((group) => new GroupEntity(group));
  }

  @Get(':id')
  @ApiOkResponse({ status: 200, type: GroupEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new GroupEntity(await this.groupService.findOne(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: GroupEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return new GroupEntity(await this.groupService.update(id, updateGroupDto));
  }

  @Delete(':id')
  @ApiOkResponse({ status: 200, type: Object })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.groupService.remove(id);
    return { message: 'successfully deleted' };
  }
}
