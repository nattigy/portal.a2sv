import { userStub } from '../stubs/user.stub'
import { MockModel } from '../../../../__test__/mock-model'
import { User } from '../../entities/user.entity'
import { Prisma } from '@prisma/client'

export class UserModel extends MockModel<User, Prisma.UserCreateInput, Prisma.UserWhereInput, Prisma.UserWhereUniqueInput, Prisma.UserUpdateInput> {
  protected entityStub = userStub()
}