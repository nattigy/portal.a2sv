import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { RolesResolver } from './roles.resolver'
import { RolesService } from './roles.service'

@Module({
  imports: [],
  providers: [PrismaService, RolesService, RolesResolver],
})
export class RolesModule {}
