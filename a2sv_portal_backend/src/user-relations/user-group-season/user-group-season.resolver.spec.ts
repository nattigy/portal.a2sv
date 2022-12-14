import { Test, TestingModule } from '@nestjs/testing'
import { UserGroupSeasonResolver } from './user-group-season.resolver'
import { UserGroupSeasonService } from './user-group-season.service'

describe('UserGroupSeasonResolver', () => {
  let resolver: UserGroupSeasonResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGroupSeasonResolver, UserGroupSeasonService],
    }).compile()

    resolver = module.get<UserGroupSeasonResolver>(UserGroupSeasonResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
