import { Test, TestingModule } from '@nestjs/testing'
import { PaginationProblem } from 'src/common/page/pagination-info'
import { CreateProblemInput } from '../dto/create-problem.input'
import { UpdateProblemInput } from '../dto/update-problem.input'
import { Problem } from '../entities/problem.entity'
import { ProblemRepository } from '../problem.repository'
import { ProblemService } from '../problem.service'
import { problemStub } from './stubs/problem.stub'
import { ProblemRepositoryMock } from './__mocks__/problem-repository.mock'

describe('ProblemService', () => {
  let service: ProblemService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProblemService, ProblemRepository],
    })
      .overrideProvider(ProblemRepository)
      .useValue(ProblemRepositoryMock)
      .compile()

    service = module.get<ProblemService>(ProblemService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createProblem', () => {
    describe('when given needed fields it should create a problem', () => {
      let problem: Problem
      let createProblemDto: CreateProblemInput
      beforeEach(async () => {
        createProblemDto = {
          title: problemStub().title,
          difficulty: problemStub().difficulty,
          link: problemStub().link,
          platform: problemStub().platform,
          tags: problemStub().tags,
        }
        problem = await service.createProblem(createProblemDto)
      })

      it('should be called with  createProblemDto argument', async () => {
        jest.spyOn(service, 'createProblem').getMockImplementation()
        expect(await service.createProblem(createProblemDto)).toEqual(problemStub())
        expect(service.createProblem).toHaveBeenCalledWith(createProblemDto)
      })

      it('should return a problem', () => {
        expect(problem).toEqual(problemStub())
      })
    })
  })

  describe('problem', () => {
    describe('when called should return a problem', () => {
      let problem: Problem

      beforeEach(async () => {
        problem = await service.problem(problemStub().id)
      })

      it('should be called with problemId argument', async () => {
        jest.spyOn(service, 'problem').getMockImplementation()
        expect(await service.problem(problemStub().id)).toEqual(problemStub())
        expect(service.problem).toHaveBeenCalledWith(problemStub().id)
      })

      it('should return a problem', async () => {
        expect(problem).toEqual(problemStub())
      })
    })
  })

  describe('problems', () => {
    describe('when called it shoulf display all problems', async () => {
      let problems: PaginationProblem
      beforeEach(async () => {
        problems = await service.problems()
      })

      it('should return list of problems', async () => {
        expect(problems.items).toEqual([problemStub()])
      })

      it('should return a list of length one', () => {
        expect(problems).toHaveLength(1)
      })
    })
  })

  describe('updateProblem', () => {
    describe('when called should update problem', () => {
      let problem: Problem
      let updateProblemDto: UpdateProblemInput

      beforeEach(async () => {
        updateProblemDto = {
          problemId: problemStub().id,
          difficulty: problemStub().difficulty,
        }
        problem = await service.updateProblem(updateProblemDto)
      })

      it('should be called with updateProblemDto argument', async () => {
        jest.spyOn(service, 'updateProblem').getMockImplementation()
        expect(await service.updateProblem(updateProblemDto)).toEqual(problemStub())
        expect(service.updateProblem).toHaveBeenCalledWith(updateProblemDto)
      })

      it('should return a problem', () => {
        expect(problem).toEqual(problemStub())
      })
    })
  })

  describe('removeProblem', () => {
    describe('when called should remove Problem', () => {
      let result: number

      beforeEach(async () => {
        result = await service.remove(problemStub().id)
      })

      it('should be called with problemId argument', async () => {
        jest.spyOn(service, 'remove').getMockImplementation()
        expect(await service.remove(problemStub().id)).toEqual(1)
        expect(service.remove).toHaveBeenCalledWith(problemStub().id)
      })

      it('should return a number', () => {
        expect(result).toEqual(1)
      })
    })
  })
})
