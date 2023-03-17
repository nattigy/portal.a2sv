import { Test, TestingModule } from '@nestjs/testing'
import { GroupSeasonResolver } from '../../services/group-season-services/group-season.resolver'
import { ManageGroupSeasonsService } from '../../services/manage-group-seasons/manage-group-seasons.service'

describe('GroupSeasonResolver', () => {
  let resolver: GroupSeasonResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupSeasonResolver, ManageGroupSeasonsService],
    }).compile()

    resolver = module.get<GroupSeasonResolver>(GroupSeasonResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
