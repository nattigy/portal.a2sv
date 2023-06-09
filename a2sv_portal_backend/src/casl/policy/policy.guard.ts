import { Ability } from '@casl/ability'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Action } from '../../app/auth/action.enum'
import { CaslAbilityFactory, Subjects } from '../casl-ability.factory'
import { PolicyHandler } from './policy-handler.type'
import { CHECK_POLICIES_KEY } from './policy.decorator'

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector, private caslAbilityFactory: CaslAbilityFactory) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || []
    if (policyHandlers.length == 0) {
      return true
    }
    const ctx = GqlExecutionContext.create(context)
    const { user } = ctx.getContext().req
    if (user == undefined) {
      return false
    }
    const ability = this.caslAbilityFactory.createForUser(user)
    return policyHandlers.every(handler => this.execPolicyHandler(handler, ability))
  }

  private execPolicyHandler(handler: PolicyHandler, ability: Ability<[Action, Subjects]>) {
    if (typeof handler === 'function') {
      return handler(ability)
    }
    return handler.handle(ability)
  }
}
