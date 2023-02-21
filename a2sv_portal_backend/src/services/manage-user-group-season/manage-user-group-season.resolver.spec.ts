import { Test, TestingModule } from '@nestjs/testing'
import { ManageUserGroupSeasonResolver } from './manage-user-group-season.resolver'
import { ManageUserGroupSeasonService } from './manage-user-group-season.service'

describe('ManageUserGroupSeasonResolver', () => {
  let resolver: ManageUserGroupSeasonResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageUserGroupSeasonResolver, ManageUserGroupSeasonService],
    }).compile()

    resolver = module.get<ManageUserGroupSeasonResolver>(ManageUserGroupSeasonResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
