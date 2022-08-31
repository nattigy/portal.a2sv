import { PrismaService } from 'src/prisma.service'
import { CreateRoleInput } from './dto/create-role.dto'
import { UpdateRoleInput } from './dto/update-role.dto'
import { Role } from '@prisma/client'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRole(data: CreateRoleInput): Promise<Role> {
    return await this.prismaService.role.create({ data })
  }

  async getRoleById(id: number): Promise<Role> {
    return await this.prismaService.role.findUnique({ where: { id } })
  }

  async getRoles(): Promise<Role[]> {
    return await this.prismaService.role.findMany()
  }

  async updateRole(id: number, data: UpdateRoleInput): Promise<Role> {
    return await this.prismaService.role.update({ where: { id }, data })
  }

  async deleteRole(id: number): Promise<Role> {
    return await this.prismaService.role.delete({ where: { id } })
  }
}
