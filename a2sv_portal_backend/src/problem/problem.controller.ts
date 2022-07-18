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
import { ProblemService } from './problem.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { ProblemEntity } from './entities/problem.entity';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('problem')
@ApiTags('Problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post()
  @ApiResponse({ status: 201, type: ProblemEntity })
  async create(@Body() createProblemDto: CreateProblemDto) {
    return new ProblemEntity(
      await this.problemService.create(createProblemDto),
    );
  }

  @Get()
  @ApiResponse({ type: ProblemEntity, isArray: true })
  async findAll(@Query() paginationQuery : PaginationQueryDto) {
    const problems = await this.problemService.findAll(paginationQuery);
    return problems.map((problem) => new ProblemEntity(problem));
  }

  @Get(':id')
  @ApiResponse({ type: ProblemEntity, isArray: true })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new ProblemEntity(await this.problemService.findOne(+id));
  }

  @Patch(':id')
  @ApiResponse({ type: ProblemEntity, isArray: true })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProblemDto: UpdateProblemDto,
  ) {
    return new ProblemEntity(
      await this.problemService.update(+id, updateProblemDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ status: 200, type: Object })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.problemService.remove(+id);
    return { message: 'successfully deleted' };
  }
}
