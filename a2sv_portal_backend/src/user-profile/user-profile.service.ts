import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
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

  findOne(id: number) {
    return this.prismaService.userProfile.findUnique({
      where: {
        id,
      },
    })
  }

  update(id: number, updateUserProfileInput: UpdateUserProfileInput) {
    return this.prismaService.userProfile.update({
      where: {
        id,
      },
      data: updateUserProfileInput,
    })
  }

  remove(id: number) {
    return this.prismaService.userProfile.delete({
      where: {
        id,
      },
    })
  }
}
