import { Test, TestingModule } from '@nestjs/testing'
import { ManageGroupSeasonsService } from '../../services/manage-group-seasons/manage-group-seasons.service'

describe('GroupSeasonService', () => {
  let service: ManageGroupSeasonsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageGroupSeasonsService],
    }).compile()

    service = module.get<ManageGroupSeasonsService>(ManageGroupSeasonsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
