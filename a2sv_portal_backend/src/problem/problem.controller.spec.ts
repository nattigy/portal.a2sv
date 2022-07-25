import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ProblemEntity } from './entities/problem.entity';
import { ProblemController } from './problem.controller';
import { ProblemService } from './problem.service';

describe('ProblemController', () => {
  let controller: ProblemController;
  let service: ProblemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemController],
      providers: [ProblemService, PrismaService],
    }).compile();

    controller = module.get<ProblemController>(ProblemController);
    service = module.get<ProblemService>(ProblemService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Problem Controller', () => {
    describe('findAll', () => {
      it('should return an array of problems entity', async () => {
        const expectedValues: any = [
          new ProblemEntity({
            problem_title: 'title',
            platform: 'platform',
            link: 'link',
            difficulty: 'Hard',
          }),
        ];

        jest.spyOn(service, 'findAll').mockImplementation(() => expectedValues);
        expect(
          await controller.findAll({
            limit: 0,
            offset: 0,
          }),
        ).toEqual(expectedValues);
      });
    });

    describe('findOne', () => {
      describe('when called with existing ProblemId', () => {
        it('should return ProblemEntity', async () => {
          const problemId = 1;
          const expectedValue: any = {
            id: 1,
            createdAt: '2022-07-11T11:27:53.364Z',
            updatedAt: '2022-07-11T12:02:10.917Z',
            problem_title: 'title',
            platform: 'platform',
            link: 'link',
            difficulty: 'Hard',
          };

          jest
            .spyOn(service, 'findOne')
            .mockImplementation(() => expectedValue);

          expect(await controller.findOne(problemId)).toEqual(expectedValue);
        });
      });

      describe('otherwise', () => {
        it('should send error', async () => {
          const problemId = 1;
          jest.spyOn(service, 'findOne').mockImplementation(() => {
            throw new NotFoundException(`Problem #${problemId} not found`);
          });

          try {
            await controller.findOne(problemId);
          } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toEqual(`Problem #${problemId} not found`);
          }
        });
      });
    });

    describe('create', () => {
      describe('when given needed fields', () => {
        it('should create Problem', async () => {
          const expectedValue: any = {
            id: 1,
            createdAt: '2022-07-11T11:27:53.364Z',
            updatedAt: '2022-07-11T12:02:10.917Z',
            problem_title: 'title',
            platform: 'platform',
            link: 'link',
            difficulty: 'Hard',
          };

          const body: any = {
            problem_title: 'title',
            platform: 'platform',
            link: 'link',
            difficulty: 'Hard',
          };

          jest.spyOn(service, 'create').mockImplementation(() => expectedValue);
          expect(await controller.create(body)).toEqual(expectedValue);
        });
      });
    });

    describe('update', () => {
      describe('when given existing problem id', () => {
        it('should update the problem', async () => {
          const problemId = 1;
          const problemBody: any = {
            problem_title: 'title',
          };

          const expectedValue: any = {
            id: 1,
            createdAt: '2022-07-11T11:27:53.364Z',
            updatedAt: '2022-07-11T12:02:10.917Z',
            problem_title: 'title',
            platform: 'platform',
            link: 'link',
            difficulty: 'Hard',
          };

          jest.spyOn(service, 'update').mockImplementation(() => expectedValue);

          const problem = await controller.update(problemId, problemBody);
          expect(problem).toEqual(expectedValue);
        });
      });

      describe('otherwise', () => {
        it('should throw an exception', async () => {
          const problemId = 1;
          jest.spyOn(service, 'update').mockImplementation(() => {
            throw new NotFoundException(`Problem #${problemId} not found`);
          });

          try {
            await controller.update(problemId, {});
          } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toEqual(`Problem #${problemId} not found`);
          }
        });
      });
    });

    describe('remove', () => {
      describe('when given existing problem id', () => {
        it('should remove the Problem', async () => {
          const problemId = 1;
          const expectedOutput: any = { message: 'successfully deleted' };
          jest
            .spyOn(service, 'remove')
            .mockImplementation(() => expectedOutput);

          expect(await controller.remove(problemId)).toEqual(expectedOutput);
        });
      });

      describe('otherwise', () => {
        it('should throw an exception', async () => {
          const problemId = 1;
          jest.spyOn(service, 'remove').mockImplementation(() => {
            throw new NotFoundException(`Problem #${problemId} not found`);
          });

          try {
            await controller.remove(problemId);
          } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toEqual(`Problem #${problemId} not found`);
          }
        });
      });
    });
  });
});
