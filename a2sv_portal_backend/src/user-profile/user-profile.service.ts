import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserProfileInput } from './dto/create-user-profile.input'
import { UpdateUserProfileInput } from './dto/update-user-profile.input'
import { UserProfile } from './entities/user-profile.entity'
import { PaginationUserProfile } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { FilterUserProfileInput } from './dto/filter-user-profile.input'

@Injectable()
export class UserProfileService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(createUserProfileInput: CreateUserProfileInput): Promise<UserProfile> {
    return this.prismaService.userProfile.create({
      data: createUserProfileInput,
    })
  }

  async findAll(
    filterUserProfileInput: FilterUserProfileInput,
    { take, skip }: PaginationInfoInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserProfile> {
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
    try {
      await this.prismaService.userProfile.delete({ where: { id } })
    } catch (e) {
      console.log(`Fail to delete user profile with id ${id}`, ' : ', e)
      throw new Error(`Fail to delete user profile with id ${id}`)
    }
    return 1
  }
}
