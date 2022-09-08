import { Test, TestingModule } from '@nestjs/testing';
import { GroupTopicProblemResolver } from './group-topic-problem.resolver';
import { GroupTopicProblemService } from './group-topic-problem.service';

describe('GroupTopicProblemResolver', () => {
  let resolver: GroupTopicProblemResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupTopicProblemResolver, GroupTopicProblemService],
    }).compile();

    resolver = module.get<GroupTopicProblemResolver>(GroupTopicProblemResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
