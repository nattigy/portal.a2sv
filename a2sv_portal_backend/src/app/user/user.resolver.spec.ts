import { Test, TestingModule } from '@nestjs/testing'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import {UserRepository} from "./user.repository";
import {PrismaService} from "../../prisma/prisma.service";
import {prismaMock} from "../../prisma/singleton";
import {UserModule} from "./user.module";
import {GroupModule} from "../group/group.module";

describe('UserResolver', () => {
  let resolver: UserResolver
  const mockUserService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        UserService,
        // { provide: UserService, useValue: mockUserService },
        // { provide: PrismaService, useValue: prismaMock },
      ]
    })
      .overrideProvider(UserService).useValue(mockUserService)
      .compile()

    resolver = module.get<UserResolver>(UserResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
