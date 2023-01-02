import { Test, TestingModule } from '@nestjs/testing'
import { UserRepository } from '../user.repository'
import { PrismaService } from '../../../prisma/prisma.service'
import { prismaMock } from '../../../prisma/singleton'
import { RoleEnum } from '.prisma/client'

describe('UserRepository', () => {
  let userRepository: UserRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        // PrismaService,
        UserRepository,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile()

    userRepository = module.get<UserRepository>(UserRepository)
  })

  it('should be defined', () => {
    expect(userRepository).toBeDefined()
  })

  describe('create', () => {
    describe('when called', () => {
      it('should create new users', async () => {
        // const expectedUsers: User[] = [user, user]
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // const users = await prismaService.user.findMany.mockResolvedValue(expectedUsers)
        const users = await userRepository.create({
          email: '',
          password: '0',
          role: RoleEnum.STUDENT,
        })
        console.log('here', users)
        // expect(users).toEqual(expectedUsers)
      })
    })
  })

  describe('findAll', () => {
    describe('when called', () => {
      it('should display all users', async () => {
        // const expectedUsers: User[] = [user, user]
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // const users = await prismaService.user.findMany.mockResolvedValue(expectedUsers)
        const users = await userRepository.findAll({
          skip: 0,
          take: 50,
          where: {},
          orderBy: {},
        })
        console.log('here', users)
        // expect(users).toEqual(expectedUsers)
      })
    })
  })
})
