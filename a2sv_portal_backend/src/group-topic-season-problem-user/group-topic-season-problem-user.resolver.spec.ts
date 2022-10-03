import { Test, TestingModule } from '@nestjs/testing'
import { GroupTopicSeasonProblemUserResolver } from './group-topic-season-problem-user.resolver'
import { GroupTopicSeasonProblemUserService } from './group-topic-season-problem-user.service'

describe('GroupTopicSeasonProblemUserResolver', () => {
  let resolver: GroupTopicSeasonProblemUserResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupTopicSeasonProblemUserResolver,
        GroupTopicSeasonProblemUserService,
      ],
    }).compile()

    resolver = module.get<GroupTopicSeasonProblemUserResolver>(
      GroupTopicSeasonProblemUserResolver,
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
