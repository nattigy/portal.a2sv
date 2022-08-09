import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Difficulty } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module';
import { TopicService } from '../topic/topic.service';
import { TopicProblemController } from './topic_problem.controller';
import { TopicProblemService } from './topic_problem.service';

describe('TopicProblemController', () => {
  let controller: TopicProblemController;
  let service: TopicProblemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [TopicProblemController],
      providers: [TopicProblemService],
    }).compile();

    controller = module.get<TopicProblemController>(TopicProblemController);
    service = module.get<TopicProblemService>(TopicProblemService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Topic-problem Controller', () => {
    describe('addProblemTopic', () => {
      describe('when given valid topic_id and problem_id', () => {
        it('should join topic_id and problem_id', async () => {
          const createDto = {
            topicId: 1,
            problemId: 1,
            assignedBy: 0,
          };
          const expectedValue: any = {};
          jest
            .spyOn(service, 'addProblemToTopic')
            .mockImplementation((createDto) => expectedValue);

          const result = await controller.addProblemToTopic(createDto);
          expect(result).toEqual(expectedValue);
        });
      });
    });

    describe('removeProblemFromTopic', () => {
      describe('when given valid topic_id and problem_id', () => {
        it('should delete relation between topic and problem', async () => {
          const removeDto = {
            topic_id: 1,
            problem_id: 1,
          };
          const expectedValue: any = {};
          jest
            .spyOn(service, 'removeProblemFromtopic')
            .mockImplementation(() => expectedValue);

          const result = await controller.removeProblemFromTopic(removeDto);
          expect(result).toEqual({ message: 'successfully deleted' });
        });
      });

      describe('otherwise', () => {
        it('should throw an excpetion', async () => {
          const removeDto = {
            topic_id: 1,
            problem_id: 1,
          };

          const expectedValue: any = {};
          jest
            .spyOn(service, 'removeProblemFromtopic')
            .mockImplementation(() => {
              throw new NotFoundException(
                `Topic #${removeDto.topic_id} and Problem #${removeDto.problem_id} not found`,
              );
            });
          try {
            await controller.removeProblemFromTopic(removeDto);
          } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toEqual(
              `Topic #${removeDto.topic_id} and Problem #${removeDto.problem_id} not found`,
            );
          }
        });
      });
    });

    describe('getAllProblemByTopic', () => {
      describe('when given valid topic_id', () => {
        it('should get all problems in the topic', async () => {
          const id = 1;
          const expectedValue: any = [
            {
              id: 1,
              createdAt: '2022-07-11T11:27:53.364Z',
              updatedAt: '2022-07-11T12:02:10.917Z',
              problem_title: 'problem 1',
              platform: 'leetcode',
              link: 'leetcode.com',
              difficulty: 'Hard' as Difficulty,
            },
            {
              id: 2,
              createdAt: '2022-07-11T11:27:53.364Z',
              updatedAt: '2022-07-11T12:02:10.917Z',
              problem_title: 'problem 2',
              platform: 'leetcode',
              link: 'leetcode.com',
              difficulty: 'Hard' as Difficulty,
            },
            {
              id: 3,
              createdAt: '2022-07-11T11:27:53.364Z',
              updatedAt: '2022-07-11T12:02:10.917Z',
              problem_title: 'problem 3',
              platform: 'leetcode',
              link: 'leetcode.com',
              difficulty: 'Hard' as Difficulty,
            },
          ];
          jest
            .spyOn(service, 'getAllProblemsByTopic')
            .mockImplementation(() => {
              return expectedValue;
            });

          const result = await controller.getAllProblemsByTopic(id, {
            limit: 0,
            offset: 0,
          });

          expect(result).toEqual(expectedValue);
        });
      });

      describe('otherwise', () => {
        it('should throw an exception', async () => {
          const id = 1;
          jest
            .spyOn(service, 'getAllProblemsByTopic')
            .mockImplementation(() => {
              throw new NotFoundException(
                `Topic #${id} and Problem #${undefined} not found`,
              );
            });

          try {
            await controller.getAllProblemsByTopic(id, { limit: 0, offset: 0 });
          } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toEqual(
              `Topic #${id} and Problem #${undefined} not found`,
            );
          }
        });
      });
    });
  });
});
