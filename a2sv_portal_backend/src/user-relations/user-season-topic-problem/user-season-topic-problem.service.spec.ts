import { Test, TestingModule } from '@nestjs/testing'
import { UserSeasonTopicProblemService } from './user-season-topic-problem.service'

describe('SeasonTopicProblemUserService', () => {
  let service: UserSeasonTopicProblemService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSeasonTopicProblemService],
    }).compile()

    service = module.get<UserSeasonTopicProblemService>(UserSeasonTopicProblemService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
