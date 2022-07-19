import { Injectable } from '@nestjs/common';
import { CreateProblemStatusDto } from './dto/create-problem_status.dto';
import { UpdateProblemStatusDto } from './dto/update-problem_status.dto';

@Injectable()
export class ProblemStatusService {
  create(createProblemStatusDto: CreateProblemStatusDto) {
    return 'This action adds a new problemStatus';
  }

  findAll() {
    return `This action returns all problemStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} problemStatus`;
  }

  update(id: number, updateProblemStatusDto: UpdateProblemStatusDto) {
    return `This action updates a #${id} problemStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} problemStatus`;
  }
}
