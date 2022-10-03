import { Injectable } from '@nestjs/common'
import { CreateGroupTopicSeasonProblemUserInput } from './dto/create-group-topic-season-problem-user.input'
import { UpdateGroupTopicSeasonProblemUserInput } from './dto/update-group-topic-season-problem-user.input'

@Injectable()
export class GroupTopicSeasonProblemUserService {
  create(
    createGroupTopicSeasonProblemUserInput: CreateGroupTopicSeasonProblemUserInput,
  ) {
    return 'This action adds a new groupTopicSeasonProblemUser'
  }

  findAll() {
    return `This action returns all groupTopicSeasonProblemUser`
  }

  findOne(id: number) {
    return `This action returns a #${id} groupTopicSeasonProblemUser`
  }

  update(
    id: number,
    updateGroupTopicSeasonProblemUserInput: UpdateGroupTopicSeasonProblemUserInput,
  ) {
    return `This action updates a #${id} groupTopicSeasonProblemUser`
  }

  remove(id: number) {
    return `This action removes a #${id} groupTopicSeasonProblemUser`
  }
}
