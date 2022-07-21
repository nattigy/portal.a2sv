import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../singleton';
import { CreateProblemStatusDto } from './dto/create-problem_status.dto';
import { UpdateProblemStatusDto } from './dto/update-problem_status.dto';
import { ProblemStatusService } from './problem_status.service';

describe('ProblemStatusService', () => {
  let service: ProblemStatusService;
  let prisma: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProblemStatusService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ProblemStatusService>(ProblemStatusService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('ProblemStatus Service', () => {
    describe('findAll', () => {
      describe('when called', () => {
        it('should display all problems', async () => {
          const expectedProblems = [{}, {}];
          prisma.problemStatus.findMany.mockReturnValue(expectedProblems);

          const problemStatus = await service.findAll({
            limit: 0,
            offset: 0,
          });

          expect(problemStatus).toEqual(expectedProblems);
        });
      });
    });

    describe('findOne', () => {
      describe('when problemstatus with id exisits', () => {
        it('should return the problemstatus object', async () => {
          const psId = 1;
          const expectedProblemStatus = {};

          prisma.problemStatus.findUnique.mockReturnValue(
            expectedProblemStatus,
          );
          const problemStatus = await service.findOne(psId);
          expect(problemStatus).toEqual(expectedProblemStatus);
        });
      });

      describe('otherwise', () => {
        it('should throw the NotFoundException', async () => {
          prisma.problemStatus.findUnique.mockReturnValue(undefined);

          try {
            await service.findOne(1);
          } catch (e) {
            expect(e).toBeInstanceOf(NotFoundException);
            expect(e.message).toEqual(`ProblemStatus #1 not found`);
          }
        });
      });
    });

    describe('update', () => {
      describe('when problem with id exsit', () => {
        it('should update the problem', async () => {
          const psId = 1;
          const expectedProblemStatus = {
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

          prisma.problemStatus.update.mockReturnValue(expectedProblemStatus);
          prisma.problemStatus.findUnique.mockReturnValue(
            expectedProblemStatus,
          );

          const problem = await service.update(
            psId,
            new UpdateProblemStatusDto({ status: 'Solved' }),
          );
          expect(problem).toEqual(expectedProblemStatus);
        });
      });

      describe('otherwise', () => {
        it('should throw the NotFoundException', async () => {
          prisma.problemStatus.findUnique.mockReturnValue(undefined);

          try {
            await service.update(1, {});
          } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toEqual(`ProblemStatus #1 not found`);
          }
        });
      });
    });

    describe('create', () => {
      describe('when given needed fields', () => {
        it('should create problem', async () => {
          const expectedProblemStatus = {
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

          prisma.problemStatus.create.mockReturnValue(expectedProblemStatus);

          const data: CreateProblemStatusDto = {
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

          const problemStatus = await service.create(data);
          expect(problemStatus).toEqual(expectedProblemStatus);
        });
      });
    });

    describe('remove', () => {
      describe('when problem with id exists', () => {
        it('should remove problemStatus', async () => {
          const psid = 1;
          const expectedValue = { data: 'data' };

          prisma.problemStatus.findUnique.mockReturnValue(expectedValue);
          prisma.problemStatus.delete.mockReturnValue(expectedValue);

          const removed = await service.remove(psid);
          expect(removed).toEqual(expectedValue);
        });
      });

      describe('otherwise', () => {
        it('should throw the NotFoundException', async () => {
          prisma.problemStatus.findUnique.mockReturnValue(undefined);

          try {
            await service.remove(1);
          } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toEqual(`ProblemStatus #1 not found`);
          }
        });
      });
    });
  });
});
