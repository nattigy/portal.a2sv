import { Test, TestingModule } from '@nestjs/testing'
import { UserGroupSeasonService } from '../../services/manage-user-group-seasons/manage-user-group-seasons.service'

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
