import { Test, TestingModule } from '@nestjs/testing';
import { GroupTopicProblemUserService } from './group-topic-problem-user.service';

describe('GroupTopicProblemUserService', () => {
  let service: GroupTopicProblemUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupTopicProblemUserService],
    }).compile();

    service = module.get<GroupTopicProblemUserService>(GroupTopicProblemUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
