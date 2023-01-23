import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../../../prisma/prisma.service'
import { UserService } from '../user.service'
import { UserRepository } from '../user.repository'
import { userCreateStub } from './stubs/user.stub'
import { UserRepositoryMock } from './_mocks/user-repository.mock'
import { Context, createMockContext, MockContext } from '../../../prisma/__test__/context'

describe('UserService', () => {
  let service: UserService
  let mockCtx: MockContext
  let ctx: Context

  beforeEach(async () => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        UserService,
        { provide: PrismaService, useValue: ctx.prisma },
      ],
    })
      .overrideProvider(UserRepository)
      .useValue(UserRepositoryMock)
      .compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    describe('when given needed fields', () => {
      it('should create group', async () => {
        const userResult = await service.createUser(userCreateStub())
        expect(userResult).toThrow('NotAcceptableException: Email is already in use!')
      })
    })
  })

  // describe('findAll', () => {
  //   describe('when called', () => {
  //     it('should display all users', async () => {
  //       const users = await service.users({})
  //       expect(users).toEqual([userStub()])
  //     })
  //   })
  // })

  // describe('findOne', () => {
  //   describe('when user with id exists', () => {
  //     it('should return user object', async () => {
  //       const user = await service.user({ id: userStub().id })
  //       expect(user).toEqual(userStub())
  //     })
  //   })
  //   describe('otherwise', () => {
  //     it('should return user object', async () => {
  //       const user = await service.user({ id: userStub().id })
  //       expect(user).toEqual(userStub())
  //     })
  //   })
  // })

  // describe('update', () => {
  //   // describe('when user with id exist', () => {
  //   //   it('should update the user', async () => {
  //   //     const userResult = await service.updateUser(updateUserStub())
  //   //     expect(userResult).toEqual(userStub())
  //   //   })
  //   // })
  //
  //   //   describe('otherwise', () => {
  //   //     it('should throw an HttpException with 404 status code', async () => {
  //   //       const userId = 1
  //   //       prismaService.user.findFirst.mockResolvedValue(undefined)
  //   //
  //   //       try {
  //   //         await service.updateUser(userId, {
  //   //           id: 0,
  //   //         })
  //   //       } catch (err) {
  //   //         expect(err).toBeInstanceOf(HttpException)
  //   //         expect(err.message).toEqual('')
  //   //         expect(err.status).toEqual(404)
  //   //       }
  //   //     })
  //   //   })
  //   // })
  //
  //   // describe('remove', () => {
  //   //   describe('when user with id exists', () => {
  //   //     it('should remove user', async () => {
  //   //       const expectedValue: User = user
  //   //
  //   //       prismaService.user.findFirst.mockResolvedValue(expectedValue)
  //   //       prismaService.user.delete.mockResolvedValue(expectedValue)
  //   //       expect('').toEqual(expectedValue)
  //   //     })
  //   //   })
  //   //
  //   //   describe('otherwise', () => {
  //   //     it('should throw HttpException with 404 status code', async () => {
  //   //       const userId = 1
  //   //       const expectedValue: User = user
  //   //
  //   //       prismaService.user.findFirst.mockResolvedValue(expectedValue)
  //   //       prismaService.user.delete.mockResolvedValue(expectedValue)
  //   //       try {
  //   //         await service.removeUser(userId)
  //   //       } catch (err) {
  //   //         expect(err).toBeInstanceOf(HttpException)
  //   //         expect(err.message).toEqual('')
  //   //         expect(err.status).toEqual(404)
  //   //       }
  //   //     })
  //   //   })
  //   // })
  // })
})