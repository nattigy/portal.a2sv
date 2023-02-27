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
import { StorageService } from 'src/storage/storage.service'

@Injectable()
export class UserProfileService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userProfileRepository: UserProfileRepository,
    private storageService: StorageService,
  ) {}

  async createUserProfile(createUserProfileInput: CreateUserProfileInput, user: User) {
    if (createUserProfileInput.photoUrl) {
      const url = await this.storageService.save(createUserProfileInput.photoUrl, user.id)
      createUserProfileInput = { ...createUserProfileInput, photoUrl: url }
    }
    return this.userProfileRepository.create({
      ...createUserProfileInput,
      email: user.email,
      user: {
        connect: { id: user.id },
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

    // userProfiles = await Promise.all(
    //   userProfiles.map(async userProfile => {
    //     return {
    //       ...userProfile,
    //       photoUrl: await this.storageService.get(userProfile.photoUrl),
    //     }
    //   }),
    // )

    return {
      items: userProfiles,
      pageInfo: { skip, take, count },
    }
  }

  async userProfile(userId?: string): Promise<UserProfile> {
    return this.userProfileRepository.findOne({ userId })

    // if (profile.photoUrl) {
    //   profile = { ...profile, photoUrl: await this.storageService.get(profile.photoUrl) }
    // }

    // return profile
  }

  async updateUserProfile({ userId, ...updates }: UpdateUserProfileInput) {
    if (updates.photoUrl) {
      // Delete previous image file from GCS
      const profile = await this.userProfile(userId)

      if (profile.photoUrl) {
        await this.storageService.delete(profile.photoUrl)
      }

      const url = await this.storageService.save(updates.photoUrl, userId)
      updates = { ...updates, photoUrl: url }
    }
    return this.userProfileRepository.update({
      where: { userId },
      data: updates,
    })
  }

  async remove(userId: string) {
    try {
      // Delete image file from GCS
      const profile = await this.userProfile(userId)
      if (profile?.photoUrl) {
        await this.storageService.delete(profile.photoUrl)
      }
      await this.userProfileRepository.remove({ userId })
    } catch (e) {
      console.log(`Fail to delete user profile with id ${userId}`, ' : ', e)
      throw new Error(`Fail to delete user profile with id ${userId}`)
    }
    return 1
  }
}
