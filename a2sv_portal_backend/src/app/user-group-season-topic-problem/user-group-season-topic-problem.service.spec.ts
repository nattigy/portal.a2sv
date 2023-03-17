import { Test, TestingModule } from '@nestjs/testing'
import { ManageUserGroupSeasonTopicProblemsService } from '../../services/manage-user-group-seasons/manage-user-group-season-topic-problems.service'

describe('SeasonTopicProblemUserService', () => {
  let service: ManageUserGroupSeasonTopicProblemsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageUserGroupSeasonTopicProblemsService],
    }).compile()

    service = module.get<ManageUserGroupSeasonTopicProblemsService>(
      ManageUserGroupSeasonTopicProblemsService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
