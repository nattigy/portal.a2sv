import { Test, TestingModule } from '@nestjs/testing'
import { UserResolver } from '../user.resolver'
import { UserServiceMock } from './_mocks/user-service.mock'
import { updateUserStub, userCreateStub, userStub } from './stubs/user.stub'
import { UserService } from '../user.service'

describe('UserResolver', () => {
  let resolver: UserResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserResolver],
    })
      .overrideProvider(UserService)
      .useValue(UserServiceMock)
      .compile()

    resolver = module.get<UserResolver>(UserResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  // describe('create user', () => {
  //   describe('when called', () => {
  //     it('should create a new users', async () => {
  //       const user = await resolver.createUser(userCreateStub())
  //       expect(user).toEqual(userStub())
  //     })
  //   })
  // })

  describe('get user', () => {
    describe('when called', () => {
      it('should get a user', async () => {
        const users = await resolver.user({ id: userStub().id })
        expect(users).toEqual(userStub())
      })
    })
  })

  describe('get users', () => {
    describe('when called', () => {
      it('should get users list', async () => {
        const users = await resolver.users()
        expect(users).toEqual([userStub()])
      })
    })
  })

  describe('update user', () => {
    describe('when called should update user', () => {
      it('should update user', async () => {
        const user = await resolver.updateUser(updateUserStub())
        expect(user).toEqual(userStub())
      })
    })
  })
})
