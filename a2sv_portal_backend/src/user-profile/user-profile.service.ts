import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserProfileInput } from './dto/create-user-profile.input'
import { UpdateUserProfileInput } from './dto/update-user-profile.input'

@Injectable()
export class UserProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserProfileInput: CreateUserProfileInput) {
    const { id, ...data } = createUserProfileInput
    return this.prismaService.userProfile.create({
      data: data,
    })
  }

  findAll() {
    return this.prismaService.userProfile.findMany()
  }

  findOne(id: string) {
    return this.prismaService.userProfile.findUnique({
      where: {
        id,
      },
    })
  }

  update(id: string, updateUserProfileInput: UpdateUserProfileInput) {
    return this.prismaService.userProfile.update({
      where: {
        id,
      },
      data: updateUserProfileInput,
    })
  }

  remove(id: string) {
    return this.prismaService.userProfile.delete({
      where: {
        id,
      },
    })
  }
}
