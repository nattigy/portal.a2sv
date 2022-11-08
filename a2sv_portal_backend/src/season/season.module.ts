import { Module } from '@nestjs/common'
import { CaslAbilityFactory } from '../casl/casl-ability.factory'
import { CaslModule } from '../casl/casl.module'
import { SeasonService } from './season.service'
import { SeasonResolver } from './season.resolver'
import { PrismaService } from 'src/prisma.service'

@Module({
  providers: [
    SeasonService,
    SeasonResolver,
    PrismaService,
    CaslModule,
    CaslAbilityFactory,
  ],
})
export class SeasonModule {}
