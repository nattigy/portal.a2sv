import { Test, TestingModule } from '@nestjs/testing';
import { GroupSeasonContestService } from './group-season-contest.service';

describe('GroupSeasonContestService', () => {
  let service: GroupSeasonContestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupSeasonContestService],
    }).compile();

    service = module.get<GroupSeasonContestService>(GroupSeasonContestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
