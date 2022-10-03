import { Module } from '@nestjs/common'
import { RolesResolver } from './roles.resolver'
import { RolesService } from './roles.service'
import { PrismaService } from '../prisma.service'

@Module({
  imports: [],
  providers: [PrismaService, RolesService, RolesResolver],
})
export class RolesModule {}
