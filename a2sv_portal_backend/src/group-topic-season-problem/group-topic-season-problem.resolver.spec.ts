import { Test, TestingModule } from '@nestjs/testing'
import { GroupTopicSeasonProblemResolver } from './group-topic-season-problem.resolver'
import { GroupTopicSeasonProblemService } from './group-topic-season-problem.service'

describe('GroupTopicSeasonProblemResolver', () => {
  let resolver: GroupTopicSeasonProblemResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupTopicSeasonProblemResolver,
        GroupTopicSeasonProblemService,
      ],
    }).compile()

    resolver = module.get<GroupTopicSeasonProblemResolver>(
      GroupTopicSeasonProblemResolver,
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
