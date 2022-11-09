import { Injectable } from '@nestjs/common'
import { Role } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateRoleInput } from './dto/create-role.dto'
import { UpdateRoleInput } from './dto/update-role.dto'

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRole(data: CreateRoleInput): Promise<Role> {
    const date = new Date()
    return await this.prismaService.role.create({
      data: {
        ...data,
        updatedAt: date.toISOString(),
      },
    })
  }

  async getRoleById(id: string): Promise<Role> {
    return await this.prismaService.role.findUnique({ where: { id } })
  }

  async getRoles(): Promise<Role[]> {
    return await this.prismaService.role.findMany()
  }

  async updateRole(id: string, data: UpdateRoleInput): Promise<Role> {
    return await this.prismaService.role.update({ where: { id }, data })
  }

  async deleteRole(id: string): Promise<Role> {
    return await this.prismaService.role.delete({ where: { id } })
  }
}
