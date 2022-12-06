import { Test, TestingModule } from '@nestjs/testing';
import { GroupSeasonTopicProblemResolver } from './group-season-topic-problem.resolver';
import { GroupSeasonTopicProblemService } from './group-season-topic-problem.service';

describe('GroupSeasonTopicProblemResolver', () => {
  let resolver: GroupSeasonTopicProblemResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupSeasonTopicProblemResolver, GroupSeasonTopicProblemService],
    }).compile();

    resolver = module.get<GroupSeasonTopicProblemResolver>(GroupSeasonTopicProblemResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
