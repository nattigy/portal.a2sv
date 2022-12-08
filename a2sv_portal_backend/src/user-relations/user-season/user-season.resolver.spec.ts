import { Test, TestingModule } from '@nestjs/testing'
import { UserSeasonResolver } from './user-season.resolver'
import { UserSeasonService } from './user-season.service'

describe('UserSeasonResolver', () => {
  let resolver: UserSeasonResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSeasonResolver, UserSeasonService],
    }).compile()

    resolver = module.get<UserSeasonResolver>(UserSeasonResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
