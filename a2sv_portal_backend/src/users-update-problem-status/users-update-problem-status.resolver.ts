import { Resolver } from '@nestjs/graphql'
import { UsersUpdateProblemStatusService } from './users-update-problem-status.service'

@Resolver()
export class UsersUpdateProblemStatusResolver {
  constructor(private readonly usersUpdateProblemStatusService: UsersUpdateProblemStatusService) {
  }
}
