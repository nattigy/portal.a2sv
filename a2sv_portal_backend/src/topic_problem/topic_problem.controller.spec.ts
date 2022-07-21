import { Test, TestingModule } from '@nestjs/testing';
import { TopicProblemController } from './topic_problem.controller';
import { TopicProblemService } from './topic_problem.service';

describe('TopicProblemController', () => {
  let controller: TopicProblemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicProblemController],
      providers: [TopicProblemService],
    }).compile();

    controller = module.get<TopicProblemController>(TopicProblemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
