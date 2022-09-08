import { Test, TestingModule } from '@nestjs/testing';
import { GroupTopicProblemUserResolver } from './group-topic-problem-user.resolver';
import { GroupTopicProblemUserService } from './group-topic-problem-user.service';

describe('GroupTopicProblemUserResolver', () => {
  let resolver: GroupTopicProblemUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupTopicProblemUserResolver, GroupTopicProblemUserService],
    }).compile();

    resolver = module.get<GroupTopicProblemUserResolver>(GroupTopicProblemUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
