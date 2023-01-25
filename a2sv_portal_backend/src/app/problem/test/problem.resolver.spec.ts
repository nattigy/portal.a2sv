import { Test, TestingModule } from '@nestjs/testing'
import { PaginationProblem } from 'src/common/page/pagination-info'
import { CreateProblemInput } from '../dto/create-problem.input'
import { FilterProblemInput } from '../dto/filter-problem-input'
import { UpdateProblemInput } from '../dto/update-problem.input'
import { Problem } from '../entities/problem.entity'
import { ProblemResolver } from '../problem.resolver'
import { ProblemService } from '../problem.service'
import { problemStub } from './stubs/problem.stub'
import { ProblemServiceMock } from './__mocks__/problem-service.mock'

describe('ProblemResolver', () => {
  let resolver: ProblemResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProblemResolver, ProblemService],
    })
      .overrideProvider(ProblemService)
      .useValue(ProblemServiceMock)
      .compile()

    resolver = module.get<ProblemResolver>(ProblemResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createProblem', () => {
    describe('when called should create problem', () => {
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
        problem = await resolver.createProblem(createProblemDto)
      })

      it('should be called with createProblemDto argument', async () => {
        jest.spyOn(resolver, 'createProblem').getMockImplementation()
        expect(await resolver.createProblem(createProblemDto)).toEqual(problemStub())
        expect(resolver.createProblem).toHaveBeenCalledWith(createProblemDto)
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
        problem = await resolver.problem(problemStub().id)
      })

      it('should be called with problemId argument', async () => {
        jest.spyOn(resolver, 'problem').getMockImplementation()
        expect(await resolver.problem(problemStub().id)).toEqual(problemStub())
        expect(resolver.problem).toHaveBeenCalledWith(problemStub().id)
      })

      it('should return a problem', async () => {
        expect(problem).toEqual(problemStub())
      })
    })
  })
  describe('problems', () => {
    describe('when called should return list of problems', () => {
      let problems: PaginationProblem

      beforeEach(async () => {
        problems = await resolver.problems()
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
        problem = await resolver.updateProblem(updateProblemDto)
      })

      it('should be called with updateProblemDto argument', async () => {
        jest.spyOn(resolver, 'updateProblem').getMockImplementation()
        expect(await resolver.updateProblem(updateProblemDto)).toEqual(problemStub())
        expect(resolver.updateProblem).toHaveBeenCalledWith(updateProblemDto)
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
        result = await resolver.removeProblem(problemStub().id)
      })

      it('should be called with problemId argument', async () => {
        jest.spyOn(resolver, 'removeProblem').getMockImplementation()
        expect(await resolver.removeProblem(problemStub().id)).toEqual(1)
        expect(resolver.removeProblem).toHaveBeenCalledWith(problemStub().id)
      })

      it('should return a number', () => {
        expect(result).toEqual(1)
      })
    })
  })
})
