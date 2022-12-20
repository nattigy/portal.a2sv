import { Test, TestingModule } from '@nestjs/testing'
import { GroupSeasonResolver } from '../../services/group-season-services/group-season.resolver'
import { GroupSeasonService } from '../../services/group-season-services/group-season.service'

describe('GroupSeasonResolver', () => {
  let resolver: GroupSeasonResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupSeasonResolver, GroupSeasonService],
    }).compile()

    resolver = module.get<GroupSeasonResolver>(GroupSeasonResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
