import { Test, TestingModule } from '@nestjs/testing'
import { GroupTopicSeasonProblemService } from './group-topic-season-problem.service'

describe('GroupTopicSeasonProblemService', () => {
  let service: GroupTopicSeasonProblemService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupTopicSeasonProblemService],
    }).compile()

    service = module.get<GroupTopicSeasonProblemService>(
      GroupTopicSeasonProblemService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
