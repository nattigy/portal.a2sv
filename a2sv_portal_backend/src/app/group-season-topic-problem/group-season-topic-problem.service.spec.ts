import { Test, TestingModule } from '@nestjs/testing'
import { GroupSeasonTopicProblemService } from '../../services/manage-group-season/group-season-topic-problem.service'

describe('GroupSeasonTopicProblemService', () => {
  let service: GroupSeasonTopicProblemService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupSeasonTopicProblemService],
    }).compile()

    service = module.get<GroupSeasonTopicProblemService>(GroupSeasonTopicProblemService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
