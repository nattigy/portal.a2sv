import { Resolver } from '@nestjs/graphql'
import { UserUpdateContestProblemService } from './user-update-contest-problem.service'

@Resolver()
export class UserUpdateContestProblemResolver {
  constructor(
    private readonly userUpdateContestProblemService: UserUpdateContestProblemService,
  ) {}
}
