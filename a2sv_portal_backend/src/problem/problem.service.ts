import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';

@Injectable()
export class ProblemService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProblemDto: CreateProblemDto) {
    return this.prismaService.problem.create({ data: createProblemDto });
  }

  findAll() {
    return this.prismaService.problem.findMany({});
  }

  findOne(id: number) {
    const problem = this.prismaService.problem.findUnique({
      where: { id: id },
    });
    if (!problem) {
      throw new NotFoundException(`Problem #${id} not found`);
    }

    return problem;
  }

  update(id: number, updateProblemDto: UpdateProblemDto) {
    const existingProblem = this.findOne(id);
    if (existingProblem) {
      return this.prismaService.problem.update({
        where: { id: id },
        data: updateProblemDto,
      });
    }

  }

  remove(id: number) {
    const exisitingProblem = this.findOne(id);
    if (exisitingProblem) {
      return this.prismaService.problem.delete({ where: { id: id } });
    }
  }
}
