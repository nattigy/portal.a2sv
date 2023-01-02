import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient, User } from '@prisma/client'
import { DeepMockProxy } from 'jest-mock-extended'
import { PrismaService } from '../../../prisma/prisma.service'
import { UserService } from '../user.service'
import { RoleEnum, StatusEnum } from '.prisma/client'
import { UserRepository } from '../user.repository'
// import { Context, createMockContext, MockContext } from './context'

// let mockCtx: MockContext
// let ctx: Context

describe('UserService', () => {
  let service: UserService
  let prismaService: DeepMockProxy<PrismaClient>
  const user: User = {
    id: 'string',
    role: RoleEnum.HEAD_OF_ACADEMY,
    email: 'string',
    password: 'string',
    status: StatusEnum.ACTIVE,
    groupId: 'string',
    createdAt: new Date(),
    updatedAt: new Date(),
    verified: false,
  }

  const mockUserRepository = {
    count: jest.fn().mockImplementation(() => 2),
    findAll: jest.fn().mockImplementation(() => []),
  }

  beforeEach(async () => {
    // mockCtx = createMockContext()
    // ctx = mockCtx as unknown as Context

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        UserRepository,
        UserService,
        // { provide: PrismaService, useValue: prismaMock },
      ],
    })
      .overrideProvider(UserRepository)
      .useValue(mockUserRepository)
      .compile()

    service = module.get<UserService>(UserService)
    // prismaService = module.get<PrismaService>(
    //   PrismaService,
    // ) as unknown as DeepMockProxy<PrismaClient>
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll', () => {
    describe('when called', () => {
      it('should display all users', async () => {
        const expectedUsers: User[] = [user, user]
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // const users = await prismaService.user.findMany.mockResolvedValue(expectedUsers)
        const users = await service.users({})
        console.log('here', users)
        // expect(users).toEqual(expectedUsers)
      })
    })
  })

  // describe('findOne', () => {
  //   describe('when user with id exists', () => {
  //     it('should return user object', async () => {
  //       const userId = 1
  //       const expectedUser: User = user
  //
  //       prismaService.user.findFirst.mockResolvedValue(expectedUser)
  //       const userResult = await service.findOne(userId)
  //       expect(userResult).toEqual(expectedUser)
  //     })
  //   })
  //   describe('otherwise', () => {
  //     it('should throw the HttpException with code 404', async () => {
  //       const userId = 1
  //       prismaService.user.findFirst.mockReturnValue(undefined)
  //
  //       try {
  //         await service.findOne(userId)
  //       } catch (err) {
  //         expect(err).toBeInstanceOf(HttpException)
  //         expect(err.message).toEqual('some message')
  //         expect(err.status).toEqual(404)
  //       }
  //     })
  //   })
  // })

  // describe('update', () => {
  //   describe('when user with id exist', () => {
  //     it('should update the user', async () => {
  //       const userId = 1
  //       const expectedUser: User = user
  //
  //       prismaService.user.update.mockResolvedValue(expectedUser)
  //       prismaService.user.findFirst.mockResolvedValue(expectedUser)
  //
  //       const userResult = await service.updateUser(userId, {
  //         id: 0,
  //       })
  //       expect(userResult).toEqual(expectedUser)
  //     })
  //   })
  //
  //   describe('otherwise', () => {
  //     it('should throw an HttpException with 404 status code', async () => {
  //       const userId = 1
  //       prismaService.user.findFirst.mockResolvedValue(undefined)
  //
  //       try {
  //         await service.updateUser(userId, {
  //           id: 0,
  //         })
  //       } catch (err) {
  //         expect(err).toBeInstanceOf(HttpException)
  //         expect(err.message).toEqual('')
  //         expect(err.status).toEqual(404)
  //       }
  //     })
  //   })
  // })

  // describe('create', () => {
  //   describe('when given needed fields', () => {
  //     it('should create group', async () => {
  //       const expectedUser: User = user
  //       prismaService.user.create.mockResolvedValue(expectedUser)
  //
  //       const data: CreateUserInput = {
  //         email: '',
  //         password: '',
  //       }
  //       const userResult = await service.createUser(data)
  //       expect(userResult).toEqual(expectedUser)
  //     })
  //   })
  // })

  // describe('remove', () => {
  //   describe('when user with id exists', () => {
  //     it('should remove user', async () => {
  //       const expectedValue: User = user
  //
  //       prismaService.user.findFirst.mockResolvedValue(expectedValue)
  //       prismaService.user.delete.mockResolvedValue(expectedValue)
  //       expect('').toEqual(expectedValue)
  //     })
  //   })
  //
  //   describe('otherwise', () => {
  //     it('should throw HttpException with 404 status code', async () => {
  //       const userId = 1
  //       const expectedValue: User = user
  //
  //       prismaService.user.findFirst.mockResolvedValue(expectedValue)
  //       prismaService.user.delete.mockResolvedValue(expectedValue)
  //       try {
  //         await service.removeUser(userId)
  //       } catch (err) {
  //         expect(err).toBeInstanceOf(HttpException)
  //         expect(err.message).toEqual('')
  //         expect(err.status).toEqual(404)
  //       }
  //     })
  //   })
  // })
})
