import { Resolver } from '@nestjs/graphql'
import { ContestLeaderboardService } from './contest-leaderboard.service'

@Resolver()
export class ContestLeaderboardResolver {
  constructor(private readonly contestLeaderboardService: ContestLeaderboardService) {}
}
