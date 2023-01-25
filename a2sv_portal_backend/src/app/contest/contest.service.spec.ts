import { Test, TestingModule } from '@nestjs/testing'
import { ContestService } from './contest.service'
import { v4 as uuidv4 } from 'uuid'
import { PrismaService } from 'src/prisma/prisma.service'

const testName = 'contest 1'
const testlink = 'https://hakerrank/contest1'
const testId = uuidv4()
const testDiv = 'Div 2'
const testStartTime = new Date()
const testEndTime = new Date(new Date().getHours() + 3)
const testProblems = [testId]
const testContestArray = [
  {
    name: testName,
    link: testlink,
    div: testDiv,
    id: testId,
    startTime: testStartTime,
    endTime: testEndTime,
    problems: { problemId: '1', testProblems },
  },
  {
    name: 'contest 2',
    link: 'link2',
    div: 'Div 1',
    id: uuidv4(),
    startTime: testStartTime,
    endTime: testEndTime,
    problems: { problemId: '2', testProblems },
  },
  {
    name: 'contest 3',
    link3: 'link3',
    div: 'Div 3',
    id: uuidv4(),
    startTime: testStartTime,
    endTime: testEndTime,
    problems: { problemId: '3', testProblems },
  },
]
const oneContest = testContestArray[0]

const db = {
  contest: {
    findMany: jest.fn().mockResolvedValue(testContestArray),
    findUnique: jest.fn().mockResolvedValue(oneContest),
    findFirst: jest.fn().mockResolvedValue(oneContest),
    create: jest.fn().mockReturnValue(oneContest),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(oneContest),
    delete: jest.fn().mockResolvedValue(oneContest),
  },
}

describe('ContestService', () => {
  let service: ContestService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContestService],
    }).compile()

    service = module.get<ContestService>(ContestService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

describe('CatService', () => {
  let service: ContestService
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContestService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile()

    service = module.get<ContestService>(ContestService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getAll seasons', () => {
    it('should return an array of cats', async () => {
      const contests = await service.contests({})
      expect(contests).toEqual(testContestArray)
    })
  })

  describe('getone season', () => {
    it('should get a single cat', () => {
      expect(service.contest(testId)).resolves.toEqual(oneContest)
    })
  })

  describe('insertOne', () => {
    it('should successfully insert a cat', () => {
      expect(
        service.createContest({
          name: testName,
          link: testlink,
          div: testDiv,
          startTime: testStartTime,
          endTime: testEndTime,
          problems: testProblems,
        }),
      ).resolves.toEqual(oneContest)
    })
  })

  describe('updateOne', () => {
    it('should call the update method', async () => {
      const contest = await service.update(testId)
      expect(contest).toEqual(oneContest)
    })
  })

  describe('deleteOne', () => {
    it('should return {deleted: true}', () => {
      expect(service.removeContest(testId)).resolves.toEqual({ deleted: true })
    })

    it('should return {deleted: false, message: err.message}', () => {
      const dbSpy = jest
        .spyOn(prisma.contest, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'))
      expect(service.removeContest('a bad uuid')).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      })
    })
  })
})
