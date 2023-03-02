import { Test, TestingModule } from '@nestjs/testing'
import { GroupSeasonTopicProblemResolver } from '../../services/group-season-services/group-season-topic-problem.resolver'
import { ManageGroupSeasonTopicProblemsService } from '../../services/manage-group-seasons/manage-group-season-topic-problems.service'

describe('GroupSeasonTopicProblemResolver', () => {
  let resolver: GroupSeasonTopicProblemResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupSeasonTopicProblemResolver, ManageGroupSeasonTopicProblemsService],
    }).compile()

    resolver = module.get<GroupSeasonTopicProblemResolver>(GroupSeasonTopicProblemResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
