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
import { UserService } from '../user/user.service'

@Injectable()
export class UserProfileService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userProfileRepository: UserProfileRepository,
    private storageService: StorageService,
    private userService: UserService,
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
      pageInfo: {
        skip,
        take,
        count,
      },
    }
  }

  async userProfile(id: string): Promise<UserProfile> {
    return await this.userProfileRepository.findOne({
      id,
    })

    // if (profile.photoUrl) {
    //   profile = { ...profile, photoUrl: await this.storageService.get(profile.photoUrl) }
    // }

    // return profile
  }

  async updateUserProfile({ userId, ...updates }: UpdateUserProfileInput) {
    if (updates.photoUrl) {
      // TOD0
      // Delete previous image file from GCS
      const user = await this.userService.user({ id: userId })
      const profile = await this.userProfileRepository.findOne({ id: user.userProfile.id })

      await this.storageService.delete(profile.photoUrl)

      const url = await this.storageService.save(updates.photoUrl, userId)
      console.log(url, 'url...')
      updates = { ...updates, photoUrl: url }
    }
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
      // TOD0
      // Delete image file from GCS
      const profile = await this.userProfile(id)
      if (profile.photoUrl) {
        await this.storageService.delete(profile.photoUrl)
      }
      await this.userProfileRepository.remove({ id })
    } catch (e) {
      console.log(`Fail to delete user profile with id ${id}`, ' : ', e)
      throw new Error(`Fail to delete user profile with id ${id}`)
    }
    return 1
  }
}
