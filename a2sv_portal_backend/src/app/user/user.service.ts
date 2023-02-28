import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common'
import { RoleEnum, StatusEnum } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { PaginationUser } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { PrismaService } from '../../prisma/prisma.service'
import { UpdateUserInput } from './dto/update-user.input'
import { FilterUserInput, UniqueUserInput } from './dto/filter-user-input'
import { UserRepository } from './user.repository'
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { email, password } = createUserInput

    const foundUser = await this.userRepository.findOne({ email })

    if (foundUser) throw new NotAcceptableException('Email is already in use!')

    const saltOrRounds = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, saltOrRounds)

    return this.userRepository.create({
      email,
      password: hash,
      // status: StatusEnum.INACTIVE,
      role: RoleEnum.STUDENT,
    })
  }

  async users(
    filterUserInput?: FilterUserInput,
    { take, skip }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUser> {
    // const name = filterUserInput?.name
    // delete filterUserInput?.name
    const usersCount = await this.userRepository.count(filterUserInput)
    const users: User[] = await this.userRepository.findAll({
      skip,
      take,
      where: {
        ...filterUserInput,
      },
    })
    return {
      items: users,
      pageInfo: {
        skip,
        take,
        count: usersCount,
      },
    }
  }

  async user({ id, email }: UniqueUserInput) {
    const user = this.userRepository.findOne({ id, email })
    if (!user) {
      throw new NotFoundException(`User with id or email${{ id, email }} not found`)
    }
    return user
  }

  async updateUser(updateUserInput: UpdateUserInput | UpdateUserInput[]) {
    if (Array.isArray(updateUserInput)) {
      let groupId = null
      if (updateUserInput.length > 0) groupId = updateUserInput[0].groupId
      return (
        await this.prismaService.user.updateMany({
          where: {
            id: { in: updateUserInput.map(u => u.userId) },
          },
          data: { groupId },
        })
      ).count
    }
    const { userId, ...updates } = updateUserInput
    /** check if user with this Id exists and if it doesn't return
     "user with this Id doesn't" exists error
     If Email is about to be updated check if the email exists and
     return "That email is already registered" Error.
     */
    const foundUser = await this.user({ id: userId })

    if (!foundUser) throw new NotFoundException(`User with id ${userId} does not exist!`)

    if (updates.email) {
      const foundUserByEmail = await this.user({ email: updates.email })

      if (foundUserByEmail && foundUserByEmail.email !== foundUser.email)
        throw new NotAcceptableException('Email is already in use!')
    }

    return this.userRepository.update({
      where: { id: userId },
      data: updates,
    })
  }

  async removeUsersFromAGroup(updateUserInput: UpdateUserInput[]) {
    if (Array.isArray(updateUserInput)) {
      let groupId = null
      if (updateUserInput.length > 0) groupId = updateUserInput[0].groupId
      return (
        await this.prismaService.user.updateMany({
          where: {
            id: { in: updateUserInput.map(u => u.userId) },
          },
          data: { groupId: null },
        })
      ).count
    }
  }

  async removeUser(id: string) {
    await this.userRepository.remove({ id })
    return 1
  }
}
