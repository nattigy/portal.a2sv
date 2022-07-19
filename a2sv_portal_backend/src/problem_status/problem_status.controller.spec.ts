import { Test, TestingModule } from '@nestjs/testing';
import { ProblemStatusController } from './problem_status.controller';
import { ProblemStatusService } from './problem_status.service';

describe('ProblemStatusController', () => {
  let controller: ProblemStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemStatusController],
      providers: [ProblemStatusService],
    }).compile();

    controller = module.get<ProblemStatusController>(ProblemStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
