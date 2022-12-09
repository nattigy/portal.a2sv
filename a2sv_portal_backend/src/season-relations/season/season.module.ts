import { Module } from '@nestjs/common'
import { SeasonResolver } from './season.resolver'
import { SeasonService } from './season.service'
import { SeasonRepository } from './season.repository'

@Module({
  providers: [SeasonRepository, SeasonService, SeasonResolver],
})
export class SeasonModule {
}
