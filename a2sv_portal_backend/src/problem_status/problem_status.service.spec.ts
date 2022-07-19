import { Test, TestingModule } from '@nestjs/testing';
import { ProblemStatusService } from './problem_status.service';

describe('ProblemStatusService', () => {
  let service: ProblemStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProblemStatusService],
    }).compile();

    service = module.get<ProblemStatusService>(ProblemStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
