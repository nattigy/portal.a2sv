import { Module } from '@nestjs/common'
import { SeasonService } from './season.service'
import { SeasonResolver } from './season.resolver'
import { PrismaService } from 'src/prisma.service'

@Module({
  providers: [SeasonService, SeasonResolver, PrismaService],
})
export class SeasonModule {}
