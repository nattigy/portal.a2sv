import { Test, TestingModule } from '@nestjs/testing'
import { GroupSeasonService } from '../../services/group-services/group-season.service'

describe('GroupSeasonService', () => {
  let service: GroupSeasonService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupSeasonService],
    }).compile()

    service = module.get<GroupSeasonService>(GroupSeasonService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
