import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ProblemStatusEntity } from './entities/problem_status.entity';
import { ProblemStatusController } from './problem_status.controller';
import { ProblemStatusService } from './problem_status.service';

describe('ProblemStatusController', () => {
  let controller: ProblemStatusController;
  let service: ProblemStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemStatusController],
      providers: [ProblemStatusService, PrismaService],
    }).compile();

    controller = module.get<ProblemStatusController>(ProblemStatusController);
    service = module.get<ProblemStatusService>(ProblemStatusService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Problem Controller', () => {
    describe('findAll', () => {
      it('should return an array of problem status ', async () => {
        const expectedValues: any = [
          new ProblemStatusEntity({
            id: 0,
            user_id: 0,
            problem_id: 0,
            status: 'Solved',
            github_link: 'string',
            number_of_tries: 0,
            time_taken: 0,
            date: new Date('2022-07-19T09:07:14.294Z'),
            language_code: 'string',
            solution_code: 'string',
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
      describe('when called with existing ProblemStatusId', () => {
        it('should return ProblemStatusEntity', async () => {
          const problemId = 1;
          const expectedValue: any = {
            user_id: 0,
            problem_id: 0,
            status: 'Solved',
            github_link: 'string',
            number_of_tries: 0,
            time_taken: 0,
            date: new Date('2022-07-19T09:07:14.294Z'),
            language_code: 'string',
            solution_code: 'string',
          };

          jest
            .spyOn(service, 'findOne')
            .mockImplementation(() => expectedValue);

          expect(await controller.findOne(problemId)).toEqual(expectedValue);
        });
      });

      describe('otherwise', () => {
        it('should throw Not Found Exception', async () => {
          const problemId = 1;
          jest.spyOn(service, 'findOne').mockImplementation(() => {
            throw new NotFoundException(
              `ProblemStatus #${problemId} not found`,
            );
          });

          try {
            await controller.findOne(problemId);
          } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toEqual(
              `ProblemStatus #${problemId} not found`,
            );
          }
        });
      });
    });

    describe('create', () => {
      describe('when given needed fields', () => {
        it('should create ProblemStatus', async () => {
          const expectedValue: any = {
            id: 0,
            user_id: 0,
            problem_id: 0,
            status: 'Solved',
            github_link: 'string',
            number_of_tries: 0,
            time_taken: 0,
            date: new Date('2022-07-19T09:07:14.294Z'),
            language_code: 'string',
            solution_code: 'string',
          };

          const body: any = {
            user_id: 0,
            problem_id: 0,
            status: 'Solved',
            github_link: 'string',
            number_of_tries: 0,
            time_taken: 0,
            date: new Date('2022-07-19T09:07:14.294Z'),
            language_code: 'string',
            solution_code: 'string',
          };

          jest.spyOn(service, 'create').mockImplementation(() => expectedValue);
          expect(await controller.create(body)).toEqual(expectedValue);
        });
      });
    });

    describe('update', () => {
      describe('when given existing problemstatus id', () => {
        it('should update the problem', async () => {
          const expectedValue: any = {
            id: 0,
            user_id: 0,
            problem_id: 0,
            status: 'Solved',
            github_link: 'string',
            number_of_tries: 0,
            time_taken: 0,
            date: new Date('2022-07-19T09:07:14.294Z'),
            language_code: 'string',
            solution_code: 'string',
          };

          jest.spyOn(service, 'update').mockImplementation(() => expectedValue);
        });
      });

      describe('otherwise', () => {
        it('should throw an exception', async () => {
          const problemId = 1;
          jest.spyOn(service, 'update').mockImplementation(() => {
            throw new NotFoundException(
              `ProblemStatus #${problemId} not found`,
            );
          });

          try {
            await controller.update(problemId, {});
          } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toEqual(
              `ProblemStatus #${problemId} not found`,
            );
          }
        });
      });
    });

    describe('remove', () => {
      describe('when given existing problemstatus id', () => {
        it('should remove the problemStatus', async () => {
          const problemId = 1;
          const expectedOutput: any = { message: 'successfully deleted' };
          jest
            .spyOn(service, 'remove')
            .mockImplementation(() => expectedOutput);

          expect(await controller.remove(problemId)).toEqual(expectedOutput);
        });
      });

      describe('otherwise', () => {
        it('should throw an NotFoundException', async () => {
          const problemId = 1;
          jest.spyOn(service, 'remove').mockImplementation(() => {
            throw new NotFoundException(
              `ProblemStatus #${problemId} not found`,
            );
          });

          try {
            await controller.remove(problemId);
          } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toEqual(
              `ProblemStatus #${problemId} not found`,
            );
          }
        });
      });
    });
  });
});
