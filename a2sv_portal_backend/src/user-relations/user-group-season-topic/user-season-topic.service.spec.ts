import { Test, TestingModule } from '@nestjs/testing'
import { UserSeasonTopicService } from './user-season-topic.service'

describe('UserTopicService', () => {
  let service: UserSeasonTopicService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSeasonTopicService],
    }).compile()

    service = module.get<UserSeasonTopicService>(UserSeasonTopicService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
