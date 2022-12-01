import { Test, TestingModule } from '@nestjs/testing';
import { SeasonContestService } from './season-contest.service';

describe('SeasonContestService', () => {
  let service: SeasonContestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonContestService],
    }).compile();

    service = module.get<SeasonContestService>(SeasonContestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
