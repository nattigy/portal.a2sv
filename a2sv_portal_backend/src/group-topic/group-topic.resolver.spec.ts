import { Test, TestingModule } from '@nestjs/testing';
import { GroupTopicResolver } from './group-topic.resolver';
import { GroupTopicService } from './group-topic.service';

describe('GroupTopicResolver', () => {
  let resolver: GroupTopicResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupTopicResolver, GroupTopicService],
    }).compile();

    resolver = module.get<GroupTopicResolver>(GroupTopicResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
