import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { UserGroupSeasonRepository } from './user-group-season.repository'
import { UpdateUserGroupSeasonInput } from './dto/update-user-group-season.input'

@Injectable()
export class UserGroupSeasonService {
  constructor(
    private readonly userGroupSeasonRepository: UserGroupSeasonRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async upsert({ userId, groupId, seasonId, ...updates }: UpdateUserGroupSeasonInput) {
    return this.userGroupSeasonRepository.upsert({
      where: {
        userId_groupId_seasonId: {
          seasonId,
          groupId,
          userId,
        },
      },
      data: updates,
    })
  }
}
