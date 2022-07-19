import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';

@Injectable()
export class ProblemService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProblemDto: CreateProblemDto) {
    return this.prismaService.problem.create({ data: createProblemDto });
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.prismaService.problem.findMany({
      skip: offset,
      take: limit,
    });
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
    this.findOne(id);

    return this.prismaService.problem.update({
      where: { id: id },
      data: updateProblemDto,
    });
  }

  remove(id: number) {
    this.findOne(id);

    return this.prismaService.problem.delete({ where: { id: id } });
  }
}
