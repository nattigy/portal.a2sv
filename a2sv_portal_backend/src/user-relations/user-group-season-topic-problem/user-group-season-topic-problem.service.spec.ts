import { Test, TestingModule } from '@nestjs/testing'
import { UserGroupSeasonTopicProblemService } from './user-group-season-topic-problem.service'

describe('SeasonTopicProblemUserService', () => {
  let service: UserGroupSeasonTopicProblemService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGroupSeasonTopicProblemService],
    }).compile()

    service = module.get<UserGroupSeasonTopicProblemService>(UserGroupSeasonTopicProblemService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
