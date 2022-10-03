import { Test, TestingModule } from '@nestjs/testing'
import { GroupTopicSeasonProblemUserService } from './group-topic-season-problem-user.service'

describe('GroupTopicSeasonProblemUserService', () => {
  let service: GroupTopicSeasonProblemUserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupTopicSeasonProblemUserService],
    }).compile()

    service = module.get<GroupTopicSeasonProblemUserService>(
      GroupTopicSeasonProblemUserService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
