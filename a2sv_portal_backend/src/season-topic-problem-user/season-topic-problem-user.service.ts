import { Injectable } from '@nestjs/common'
import { CreateSeasonTopicProblemUserInput } from './dto/create-season-topic-problem-user.input'
import { UpdateSeasonTopicProblemUserInput } from './dto/update-season-topic-problem-user.input'

@Injectable()
export class SeasonTopicProblemUserService {
  create(createSeasonTopicProblemUserInput: CreateSeasonTopicProblemUserInput) {
    return 'This action adds a new seasonTopicProblemUser'
  }

  findAll() {
    return `This action returns all seasonTopicProblemUser`
  }

  findOne(id: UpdateSeasonTopicProblemUserInput) {
    return `This action returns a #${id} seasonTopicProblemUser`
  }

  update(updateSeasonTopicProblemUserInput: UpdateSeasonTopicProblemUserInput) {
    return `This action updates a #${updateSeasonTopicProblemUserInput} seasonTopicProblemUser`
  }

  remove(id: UpdateSeasonTopicProblemUserInput) {
    return `This action removes a #${id} seasonTopicProblemUser`
  }
}
