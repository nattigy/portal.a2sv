import { Module } from '@nestjs/common'
import { SeasonModule } from '../../app/season/season.module'
import { ManageSeasonsResolver } from './manage-seasons.resolver'
import { ManageSeasonsService } from './manage-seasons.service'

@Module({
  imports: [SeasonModule],
  providers: [ManageSeasonsResolver, ManageSeasonsService],
})
export class ManageSeasonsModule {}
