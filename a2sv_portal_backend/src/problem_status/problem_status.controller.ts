import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProblemStatusService } from './problem_status.service';
import { CreateProblemStatusDto } from './dto/create-problem_status.dto';
import { UpdateProblemStatusDto } from './dto/update-problem_status.dto';

@Controller('problem-status')
export class ProblemStatusController {
  constructor(private readonly problemStatusService: ProblemStatusService) {}

  @Post()
  create(@Body() createProblemStatusDto: CreateProblemStatusDto) {
    return this.problemStatusService.create(createProblemStatusDto);
  }

  @Get()
  findAll() {
    return this.problemStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProblemStatusDto: UpdateProblemStatusDto) {
    return this.problemStatusService.update(+id, updateProblemStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.problemStatusService.remove(+id);
  }
}
