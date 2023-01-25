import { Test, TestingModule } from '@nestjs/testing'
import { UsersUpdateProblemStatusService } from './users-update-problem-status.service'

describe('UsersUpdateProblemStatusService', () => {
  let service: UsersUpdateProblemStatusService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersUpdateProblemStatusService],
    }).compile()

    service = module.get<UsersUpdateProblemStatusService>(UsersUpdateProblemStatusService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
