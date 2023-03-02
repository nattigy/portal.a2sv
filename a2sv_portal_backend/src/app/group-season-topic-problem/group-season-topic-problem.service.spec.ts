import { Test, TestingModule } from '@nestjs/testing'
import { ManageGroupSeasonTopicProblemsService } from '../../services/manage-group-seasons/manage-group-season-topic-problems.service'

describe('GroupSeasonTopicProblemService', () => {
  let service: ManageGroupSeasonTopicProblemsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageGroupSeasonTopicProblemsService],
    }).compile()

    service = module.get<ManageGroupSeasonTopicProblemsService>(ManageGroupSeasonTopicProblemsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
