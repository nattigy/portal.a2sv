import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { UserProfile } from './entities/user-profile.entity'
import { UserProfileRepository } from './user-profile.repository'
import { CreateUserProfileInput } from './dto/create-user-profile.input'

@Injectable()
export class UserProfileService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userProfileRepository: UserProfileRepository,
  ) {
  }

  async createProfile(createUserProfileInput: CreateUserProfileInput){
    return
  }

  // async userProfiles(
  //   filterUserProfileInput: FilterUserProfileInput,
  //   { take, skip }: PaginationInput = { take: 50, skip: 0 },
  // ): Promise<PaginationUserProfile> {
  //   const count = await this.userProfileRepository.count(filterUserProfileInput)
  //   const userProfiles: UserProfile[] = await this.userProfileRepository.findAll({
  //     where: filterUserProfileInput,
  //   })
  //   return {
  //     items: userProfiles,
  //     pageInfo: {
  //       skip,
  //       take,
  //       count,
  //     },
  //   }
  // }

  async userProfile(id: string): Promise<UserProfile> {
    return this.userProfileRepository.findOne({
      id,
    })
  }

  // async updateUserProfile(updateUserProfileInput: UpdateUserProfileInput || createUserProfileInput: CreateUserProfileInput) {
  //   return this.prismaService.userProfile.upsert({
  //     where: {
  //       userId: updateUserProfileInput.userId,
  //     },
  //     update: {},
  //     create: {
  //       ...updateUserProfileInput,
  //       user: {
  //             connect: {
  //               userId
  //             }
  //           }
  //     },
  //   })
  // }

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
