import { Module } from '@nestjs/common'
import { SeasonRepository } from 'dist/src/season/season.repository'
import { SeasonResolver } from './season.resolver'
import { SeasonService } from './season.service'

@Module({
  providers: [SeasonRepository,SeasonService, SeasonResolver],
})
export class SeasonModule {}
