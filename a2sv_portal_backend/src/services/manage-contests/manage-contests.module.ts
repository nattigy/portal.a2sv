import { Module } from '@nestjs/common'
import { ManageContestsService } from './manage-contests.service'
import { ManageContestsResolver } from './manage-contests.resolver'
import { ContestModule } from '../../app/contest/contest.module'

@Module({
  imports: [ContestModule],
  providers: [ManageContestsService, ManageContestsResolver],
})
export class ManageContestsModule {}
