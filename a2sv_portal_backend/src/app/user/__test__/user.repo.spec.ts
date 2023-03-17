import { Test, TestingModule } from '@nestjs/testing'
import { UserRepository } from '../user.repository'
import { PrismaService } from '../../../prisma/prisma.service'
import { User } from '../entities/user.entity'
import { UserModel } from './support/user.model'

describe('UserRepository', () => {
  let userRepository: UserRepository
  let userModel: UserModel

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        // PrismaService,
        UserRepository,
        // { provide: PrismaService, useValue: prismaMock },
        {
          provide: PrismaService,
          // provide: Prisma.Prisma__UserClient,
          useValue: UserModel,
          useClass: UserModel,
        },
      ],
    }).compile()

    userRepository = module.get<UserRepository>(UserRepository)
    userModel = module.get<UserModel>(User)
  })

  it('should be defined', () => {
    expect(userRepository).toBeDefined()
  })

  // describe('create', () => {
  //   describe('when called', () => {
  //     it('should create new users', async () => {
  //       const user = await userRepository.create({
  //         email: userStub().email,
  //         password: userStub().password,
  //         status: StatusEnum.ACTIVE,
  //         role: RoleEnum.STUDENT,
  //       })
  //       expect(user).toEqual(userStub())
  //     })
  //   })
  // })

  // describe('findAll', () => {
  //   describe('when called', () => {
  //     it('should display all users', async () => {
  //       const users = await userRepository.findAll({
  //         skip: 0,
  //         take: 50,
  //         where: {},
  //         orderBy: {},
  //       })
  //       expect(users).toEqual([userStub()])
  //     })
  //   })
  // })
})
