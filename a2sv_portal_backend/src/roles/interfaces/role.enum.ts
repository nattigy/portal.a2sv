import { registerEnumType } from '@nestjs/graphql'

export enum RoleEnum {
  STUDENT = 'STUDENT',
  HEAD_OF_EDUCATION = 'HEAD_OF_EDUCATION',
  HEAD_OF_ACADEMY = 'HEAD_OF_ACADEMY',
  ASSISTANT = 'ASSISTANT',
  ADMIN = 'ADMIN',
}

registerEnumType(RoleEnum, { name: 'RoleEnum' })
