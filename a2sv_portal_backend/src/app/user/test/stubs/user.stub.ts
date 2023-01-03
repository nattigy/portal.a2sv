import { RoleEnum, StatusEnum } from '@prisma/client'

export const userStub = () => ({
  id: 'id',
  email: 'nati@a2sv.org',
  phoneNumber: '+251946625264',
  password: 'nati@1234',
  role: RoleEnum.STUDENT,
  status: StatusEnum.ACTIVE,
  createdAt: new Date('2023-01-01T18:21:27.974Z'),
  updatedAt: new Date('2023-01-01T18:21:27.974Z'),
})

export const updateUserStub = () => ({
  userId: 'id',
  email: 'nati@a2sv.org',
  phoneNumber: '+251946625264',
  role: RoleEnum.STUDENT,
  status: StatusEnum.ACTIVE,
})

export const userCreateStub = () => ({
  // fullName: "Nathnael",
  // phoneNumber: '+251946625264',
  // password: 'nati@1234',
  // role: UserRoleEnum.NORMAL,
  // status: UserStatusEnum.ACTIVE,
})
