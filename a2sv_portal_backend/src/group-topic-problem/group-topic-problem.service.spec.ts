import { Test, TestingModule } from '@nestjs/testing';
import { GroupTopicProblemService } from './group-topic-problem.service';

describe('GroupTopicProblemService', () => {
  let service: GroupTopicProblemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupTopicProblemService],
    }).compile();

    service = module.get<GroupTopicProblemService>(GroupTopicProblemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
