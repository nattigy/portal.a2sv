import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../singleton';
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

      describe('otherwise', ()=>{
        it('should throw the NotFoundException', async ()=>{
          prisma.problemStatus.findUnique.mockReturnValue(undefined);

          try{
            await service.findOne(1);
          }catch(e){
            expect(e).toBeInstanceOf(NotFoundException);
            expect(e.message).toEqual(`ProblemStatus #1 not found`);
          }
        })
      })
    });

    describe('update', ()=>{
      describe('when problem with id exsit', ()=>{
        it('should update the problem', async ()=>{
          const psId = 1;
          const expectedProblemStatus = {
            
          }
        })
      })
    })
  });
});
