import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../singleton';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { ProblemService } from './problem.service';

describe('ProblemService', () => {
  let service: ProblemService;
  let prismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProblemService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ProblemService>(ProblemService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    describe('when called', () => {
      it('should display all problems', async () => {
        const expectedProblems = [{}, {}];
        prismaService.problem.findMany.mockReturnValue(expectedProblems);

        const problems = await service.findAll({
          limit: 0,
          offset: 0,
        });
        expect(problems).toEqual(expectedProblems);
      });
    });
  });

  describe('findOne', () => {
    describe('when problem with ID exists', () => {
      it('should return the problem object', async () => {
        const problemId = 1;
        const expectedProblem = {};

        prismaService.problem.findUnique.mockReturnValue(expectedProblem);
        const problem = await service.findOne(problemId);
        expect(problem).toEqual(expectedProblem);
      });
    });

    describe('otherwise', () => {
      it('should throw the NotFoundException', async () => {
        prismaService.problem.findUnique.mockReturnValue(undefined);

        try {
          await service.findOne(1);
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException);
          expect(e.message).toEqual(`Problem #1 not found`);
          expect(e.status).toEqual(404);
        }
      });
    });
  });

  describe('update', () => {
    describe('when problem with id exist', () => {
      it('should update the problem', async () => {
        const problemId = 1;
        const expectedProblem = {
          id: problemId,
          createdAt: '2022-07-11T11:27:53.364Z',
          updatedAt: '2022-07-11T12:02:10.917Z',
          problem_title: 'title',
          platform: 'platform',
          link: 'link',
          difficulty: 'difficulty',
        };

        prismaService.problem.update.mockReturnValue(expectedProblem);
        prismaService.problem.findUnique.mockReturnValue(expectedProblem);

        const problem = await service.update(
          problemId,
          new UpdateProblemDto({ problem_title: 'title' }),
        );

        expect(problem).toEqual(expectedProblem);
      });
    });

    describe('otherwise', () => {
      it('should throw the NotFoundException', async () => {
        prismaService.problem.findUnique.mockReturnValue(undefined);

        try {
          await service.update(1, {});
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException);
          expect(e.message).toEqual(`Problem #1 not found`);
          expect(e.status).toEqual(404);
        }
      });
    });
  });

  describe('create', () => {
    describe('when given needed fields', () => {
      it('should create problem', async () => {
        const expectedProblem = {
          id: 1,
          createdAt: '2022-07-11T11:27:53.364Z',
          updatedAt: '2022-07-11T12:02:10.917Z',
          problem_title: 'title',
          platform: 'platform',
          link: 'link',
          difficulty: 'difficulty',
        };

        prismaService.problem.create.mockReturnValue(expectedProblem);

        const data: CreateProblemDto = {
          problem_title: 'title',
          platform: 'platform',
          link: 'link',
          difficulty: 'difficulty',
        };

        const problem = await service.create(data);
        expect(problem).toEqual(expectedProblem);
      });
    });
  });

  describe('remove', () => {
    describe('when problem with id exists', () => {
      it('should remove problem', async () => {
        const problemId = 1;
        const expectedValue = { data: 'data' };

        prismaService.problem.findUnique.mockReturnValue(expectedValue);
        prismaService.problem.delete.mockReturnValue(expectedValue);
        const removed = await service.remove(problemId);
        expect(removed).toEqual(expectedValue);
      });
    });

    describe('otherwise', () => {
      it('should throw the NotFoundException', async () => {
        prismaService.problem.findUnique.mockReturnValue(undefined);

        try {
          await service.remove(1);
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException);
          expect(e.message).toEqual(`Problem #1 not found`);
          expect(e.status).toEqual(404);
        }
      });
    });
  });
});
