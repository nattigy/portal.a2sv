import { Injectable } from '@nestjs/common'
import { ManageUserGroupSeasonsService } from './manage-user-group-seasons.service'

@Injectable()
export class StudentsRankService {
  constructor(
    private readonly manageUserGroupSeasonsService: ManageUserGroupSeasonsService,
  ) {
  }

  async rankByProblemsSolved(){
    const userGroupSeasons = await this.manageUserGroupSeasonsService.userGroupSeasons({})
  }
}