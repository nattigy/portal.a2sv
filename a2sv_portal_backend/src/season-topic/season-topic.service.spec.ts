import { Test, TestingModule } from '@nestjs/testing';
import { SeasonTopicService } from './season-topic.service';

describe('SeasonTopicService', () => {
  let service: SeasonTopicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonTopicService],
    }).compile();

    service = module.get<SeasonTopicService>(SeasonTopicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
