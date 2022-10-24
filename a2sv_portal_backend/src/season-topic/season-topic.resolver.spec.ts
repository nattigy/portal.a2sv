import { Test, TestingModule } from '@nestjs/testing';
import { SeasonTopicResolver } from './season-topic.resolver';
import { SeasonTopicService } from './season-topic.service';

describe('SeasonTopicResolver', () => {
  let resolver: SeasonTopicResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonTopicResolver, SeasonTopicService],
    }).compile();

    resolver = module.get<SeasonTopicResolver>(SeasonTopicResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
