import { Test, TestingModule } from '@nestjs/testing'
import { UsersUpdateProblemStatusResolver } from './users-update-problem-status.resolver'

describe('UsersUpdateProblemStatusResolver', () => {
  let resolver: UsersUpdateProblemStatusResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersUpdateProblemStatusResolver],
    }).compile()

    resolver = module.get<UsersUpdateProblemStatusResolver>(UsersUpdateProblemStatusResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
