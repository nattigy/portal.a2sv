import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Difficulty } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../singleton';
import { TopicProblemService } from './topic_problem.service';

describe('TopicProblemService', () => {
  let service: TopicProblemService;
  let prismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TopicProblemService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<TopicProblemService>(TopicProblemService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Topic_Problem Service', () => {
    describe('getAllProblemsByTopic', () => {
      describe('when given correct id', () => {
        it('should return list of problems', async () => {
          const id = 0;
          const expectedValue = [
            {
              problem: {
                id: 1,
                createdAt: '2022-07-11T11:27:53.364Z',
                updatedAt: '2022-07-11T12:02:10.917Z',
                problem_title: 'problem 1',
                platform: 'leetcode',
                link: 'leetcode.com',
                difficulty: 'Hard' as Difficulty,
                ProblemOnTopic: {},
              },
            },
            {
              problem: {
                id: 2,
                createdAt: '2022-07-11T11:27:53.364Z',
                updatedAt: '2022-07-11T12:02:10.917Z',
                problem_title: 'problem 2',
                platform: 'leetcode',
                link: 'leetcode.com',
                difficulty: 'Hard' as Difficulty,
                ProblemOnTopic: {},
              },
            },
            {
              problem: {
                id: 3,
                createdAt: '2022-07-11T11:27:53.364Z',
                updatedAt: '2022-07-11T12:02:10.917Z',
                problem_title: 'problem 3',
                platform: 'leetcode',
                link: 'leetcode.com',
                difficulty: 'Hard' as Difficulty,
                ProblemOnTopic: {},
              },
            },
          ];
          prismaService.problemOnTopic.findMany.mockReturnValue(expectedValue);

          const response = await service.getAllProblemsByTopic(id, {
            offset: 0,
            limit: 0,
          });

          const res = expectedValue.map((res) => {
            const { ProblemOnTopic, ...problem } = res.problem;
            return problem;
          });
          expect(response).toEqual(res);
        });
      });

      describe('otherwise', () => {
        it('should throw Exception', async () => {
          const id = 1;
          prismaService.problemOnTopic.findMany.mockReturnValue(() => []);

          try {
            await service.getAllProblemsByTopic(id, { limit: 0, offset: 0 });
          } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toEqual(
              `Topic #${id} and Problem #${undefined} not found`,
            );
          }
        });
      });
    });

    describe('addProblemToTopic', () => {
      describe('when give valid topicId and problemId', () => {
        it('should add problem to topic', () => {
          const createTopicProblemDto = {
            topicId: 1,
            problemId: 1,
            assignedBy: 0,
          };
          const expectedValue = { topic_id: 1, problem_id: 1 };

          prismaService.problemOnTopic.create.mockReturnValue(expectedValue);

          const result = service.addProblemToTopic(createTopicProblemDto);
          expect(result).toEqual(expectedValue);
        });
      });
    });

    describe('removeProblemFromTopic', () => {
      describe('when topicId and problemId are valid pairs', () => {
        it('should remove problemId and topicId', async () => {
          const removeDto = {
            topic_id: 1,
            problem_id: 1,
          };
          const expectedValue = [{ topic_id: 1, problem_id: 2 }];
          prismaService.problemOnTopic.findMany.mockReturnValue(expectedValue);
          prismaService.problemOnTopic.deleteMany.mockReturnValue(expectedValue);

          const result = await service.removeProblemFromtopic(removeDto);
          expect(result).toEqual(expectedValue);
        });
      });

      describe('otherwise', () => {
        it('should throw excepction', async () => {
          const removeDto = {
            topic_id: 1,
            problem_id: 1,
          };
          prismaService.problemOnTopic.findMany.mockReturnValue([]);

          try {
            await service.removeProblemFromtopic(removeDto);
          } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toEqual(
              `Topic #${removeDto.topic_id} and Problem #${removeDto.problem_id} not found`,
            );
          }
        });
      });
    });
  });
});
