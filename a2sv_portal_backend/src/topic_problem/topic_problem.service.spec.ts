import { Test, TestingModule } from '@nestjs/testing';
import { TopicProblemService } from './topic_problem.service';

describe('TopicProblemService', () => {
  let service: TopicProblemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicProblemService],
    }).compile();

    service = module.get<TopicProblemService>(TopicProblemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
