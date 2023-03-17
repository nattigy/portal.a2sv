import { Test, TestingModule } from '@nestjs/testing'
import { ProblemRepository } from '../problem.repository'

describe('ProblemRepository', () => {
  let repository: ProblemRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProblemRepository],
    }).compile()

    repository = module.get<ProblemRepository>(ProblemRepository)
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })
})
