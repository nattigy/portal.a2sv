import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserProfileInput } from './dto/create-user-profile.input'
import { UpdateUserProfileInput } from './dto/update-user-profile.input'
import { UserProfile } from './entities/user-profile.entity'
import { PaginationOutput } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { FilterUserProfileInput } from './dto/filter-user-profile.input'

@Injectable()
export class UserProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserProfileInput: CreateUserProfileInput): Promise<UserProfile> {
    return this.prismaService.userProfile.create({
      data: createUserProfileInput,
    })
  }

  async findAll(
    filterUserProfileInput: FilterUserProfileInput,
    { take, skip }: PaginationInfoInput,
  ): Promise<PaginationOutput<UserProfile>> {
    const count = (
      await this.prismaService.userProfile.findMany({
        where: filterUserProfileInput,
        select: {
          id: true,
        },
      })
    ).length
    const userProfiles: UserProfile[] = await this.prismaService.userProfile.findMany({
      where: filterUserProfileInput,
    })
    return {
      items: userProfiles,
      pageInfo: {
        skip,
        take,
        count,
      },
    }
  }

  async findOne(id: string): Promise<UserProfile> {
    return this.prismaService.userProfile.findUnique({
      where: {
        id,
      },
    })
  }

  async update(updateUserProfileInput: UpdateUserProfileInput) {
    return this.prismaService.userProfile.update({
      where: {
        id: updateUserProfileInput.id,
      },
      data: updateUserProfileInput,
    })
  }

  async remove(id: string) {
    return this.prismaService.userProfile.delete({
      where: {
        id,
      },
    })
  }
}
