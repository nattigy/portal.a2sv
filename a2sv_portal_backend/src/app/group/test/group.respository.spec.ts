import { Test, TestingModule } from '@nestjs/testing'
import { GroupRepository } from '../group.repository'

describe('GroupRepository', () => {
  let repository: GroupRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupRepository],
    }).compile()

    repository = module.get<GroupRepository>(GroupRepository)
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })
})
