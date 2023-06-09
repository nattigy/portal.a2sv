import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { RoleEnum } from '@prisma/client'

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)
  return ctx.getContext().req.user
})

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

export const ROLES_KEY = 'role'
export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles)
