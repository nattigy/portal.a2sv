import { Test, TestingModule } from '@nestjs/testing'
import { UserGroupSeasonService } from './user-group-season.service'

describe('UserGroupSeasonService', () => {
  let service: UserGroupSeasonService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGroupSeasonService],
    }).compile()

    service = module.get<UserGroupSeasonService>(UserGroupSeasonService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
