import { Injectable } from '@nestjs/common'
import { CreateProblemInput } from './dto/create-problem.input'
import { UpdateProblemInput } from './dto/update-problem.input'
import { PrismaService } from '../prisma.service'
import { Problem } from '@prisma/client'
import { TagService } from '../tag/tag.service'

@Injectable()
export class ProblemService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProblemInput: CreateProblemInput): Promise<Problem> {
    const { tags, ...problem } = createProblemInput
    const problemTags = tags.map(async ({ name }) => {
      const tag = await this.prismaService.tag.upsert({
        where: { name },
        update: { name },
        create: { name },
      })
      return { id: tag.id }
    })
    let newProblem: any
    await Promise.all(problemTags).then((results) => {
      newProblem = this.prismaService.problem.create({
        data: {
          ...problem,
          tags: {
            connect: results,
          },
        },
        include: {
          tags: true,
        },
      })
    })
    return newProblem
  }

  async findAll(): Promise<Problem[]> {
    return this.prismaService.problem.findMany({ include: { tags: true } })
  }

  async findOne(id: number): Promise<Problem> {
    return this.prismaService.problem.findUnique({
      where: { id },
      include: { tags: true },
    })
  }

  async update(
    id: number,
    updateProblemInput: UpdateProblemInput,
  ): Promise<Problem> {
    return this.prismaService.problem.update({
      where: { id },
      data: updateProblemInput,
      include: {
        tags: true,
      },
    })
  }

  async remove(id: number): Promise<Problem | null> {
    return this.prismaService.problem.delete({ where: { id } })
  }
}
