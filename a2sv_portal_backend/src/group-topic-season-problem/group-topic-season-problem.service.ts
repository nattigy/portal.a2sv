import { Injectable } from '@nestjs/common'
import { CreateGroupTopicSeasonProblemInput } from './dto/create-group-topic-season-problem.input'
import { UpdateGroupTopicSeasonProblemInput } from './dto/update-group-topic-season-problem.input'

@Injectable()
export class GroupTopicSeasonProblemService {
  create(
    createGroupTopicSeasonProblemInput: CreateGroupTopicSeasonProblemInput,
  ) {
    return 'This action adds a new groupTopicSeasonProblem'
  }

  findAll() {
    return `This action returns all groupTopicSeasonProblem`
  }

  findOne(id: number) {
    return `This action returns a #${id} groupTopicSeasonProblem`
  }

  update(
    id: number,
    updateGroupTopicSeasonProblemInput: UpdateGroupTopicSeasonProblemInput,
  ) {
    return `This action updates a #${id} groupTopicSeasonProblem`
  }

  remove(id: number) {
    return `This action removes a #${id} groupTopicSeasonProblem`
  }
}
