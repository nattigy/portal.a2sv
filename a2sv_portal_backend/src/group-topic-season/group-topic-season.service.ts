import { Injectable } from '@nestjs/common'
import { CreateGroupTopicSeasonInput } from './dto/create-group-topic-season.input'
import { UpdateGroupTopicSeasonInput } from './dto/update-group-topic-season.input'

@Injectable()
export class GroupTopicSeasonService {
  create(createGroupTopicSeasonInput: CreateGroupTopicSeasonInput) {
    return 'This action adds a new groupTopicSeason'
  }

  findAll() {
    return `This action returns all groupTopicSeason`
  }

  findOne(id: number) {
    return `This action returns a #${id} groupTopicSeason`
  }

  update(id: number, updateGroupTopicSeasonInput: UpdateGroupTopicSeasonInput) {
    return `This action updates a #${id} groupTopicSeason`
  }

  remove(id: number) {
    return `This action removes a #${id} groupTopicSeason`
  }
}
