import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { UserProfile } from './entities/user-profile.entity'
import { UserProfileRepository } from './user-profile.repository'
import { CreateUserProfileInput } from './dto/create-user-profile.input'
import { FilterUserProfileInput } from './dto/filter-user-profile.input'
import { PaginationUserProfile } from 'src/common/page/pagination-info'
import { PaginationInput } from 'src/common/page/pagination.input'
import { UpdateUserProfileInput } from './dto/update-user-profile.input'
import { User } from '../user/entities/user.entity'

@Injectable()
export class UserProfileService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userProfileRepository: UserProfileRepository,
  ) {}

  async createUserProfile(createUserProfileInput: CreateUserProfileInput, user: User) {
    return this.userProfileRepository.create({
      ...createUserProfileInput,
      email: user.email,
      user: {
        connect: { id: user.id },
      },
      userProfileAddress: {
        create: createUserProfileInput.userProfileAddress,
      },
    })
  }

  async userProfiles(
    filterUserProfileInput: FilterUserProfileInput,
    { take, skip }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserProfile> {
    const count = await this.userProfileRepository.count(filterUserProfileInput)
    const userProfiles: UserProfile[] = await this.userProfileRepository.findAll({
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

  async userProfile(id: string): Promise<UserProfile> {
    return this.userProfileRepository.findOne({
      id,
    })
  }

  async updateUserProfile({ userId, ...updates }: UpdateUserProfileInput) {
    return this.userProfileRepository.update({
      where: {
        userId,
      },
      data: {
        ...updates,
        userProfileAddress: {},
      },
    })
  }

  async remove(id: string) {
    try {
      await this.userProfileRepository.remove({ id })
    } catch (e) {
      console.log(`Fail to delete user profile with id ${id}`, ' : ', e)
      throw new Error(`Fail to delete user profile with id ${id}`)
    }
    return 1
  }
}
