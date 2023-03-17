import { Resolver } from '@nestjs/graphql'
import { ContestStatsService } from './contest-stats.service'

@Resolver()
export class ContestStatsResolver {
  constructor(private readonly contestStatsService: ContestStatsService) {}
}
