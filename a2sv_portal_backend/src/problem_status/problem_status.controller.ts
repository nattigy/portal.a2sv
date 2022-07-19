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
import { ProblemStatusService } from './problem_status.service';
import { CreateProblemStatusDto } from './dto/create-problem_status.dto';
import { UpdateProblemStatusDto } from './dto/update-problem_status.dto';
import { ProblemStatusEntity } from './entities/problem_status.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('problem-status')
@ApiTags('problem-status')
export class ProblemStatusController {
  constructor(private readonly problemStatusService: ProblemStatusService) {}

  @Post()
  async create(@Body() createProblemStatusDto: CreateProblemStatusDto) {
    return new ProblemStatusEntity(
      await this.problemStatusService.create(createProblemStatusDto),
    );
  }

  @Get()
  async findAll(@Query() paginationQuery: any) {
    const problemStatus = await this.problemStatusService.findAll(
      paginationQuery,
    );
    return problemStatus.map(
      (problemStatus) => new ProblemStatusEntity(problemStatus),
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new ProblemStatusEntity(await this.problemStatusService.findOne(id));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProblemStatusDto: UpdateProblemStatusDto,
  ) {
    return new ProblemStatusEntity(
      await this.problemStatusService.update(id, updateProblemStatusDto),
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.problemStatusService.remove(id);
    return { message: 'successfully deleted' };
  }
}
