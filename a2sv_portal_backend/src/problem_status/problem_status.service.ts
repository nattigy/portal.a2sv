import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProblemStatusDto } from './dto/create-problem_status.dto';
import { UpdateProblemStatusDto } from './dto/update-problem_status.dto';

@Injectable()
export class ProblemStatusService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProblemStatusDto: CreateProblemStatusDto) {
    return this.prismaService.problemStatus.create({
      data: createProblemStatusDto,
    });
  }

  findAll(paginationQuery: any) {
    const { limit, offset } = paginationQuery;
    return this.prismaService.problemStatus.findMany({
      skip: offset,
      take: limit,
    });
  }

  findOne(id: number) {
    const problemStatus = this.prismaService.problemStatus.findUnique({
      where: { id: id },
    });
    if (!problemStatus) {
      throw new NotFoundException(`ProblemStatus #${id} not found`);
    }

    return problemStatus;
  }

  update(id: number, updateProblemStatusDto: UpdateProblemStatusDto) {
    this.findOne(id);

    return this.prismaService.problemStatus.update({
      where: { id: id },
      data: updateProblemStatusDto,
    });
  }

  remove(id: number) {
    this.findOne(id);
    return this.prismaService.problemStatus.delete({ where: { id: id } });
  }
}
