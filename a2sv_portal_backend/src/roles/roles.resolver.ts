import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateRoleInput } from './dto/create-role.dto'
import { UpdateRoleInput } from './dto/update-role.dto'
import { Role } from './entities/role.entity'
import { RolesService } from './roles.service'

@Resolver((of) => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Query((returns) => [Role])
  async roles() {
    return await this.rolesService.getRoles()
  }

  @Query((returns) => Role)
  async role(@Args('id') id: string) {
    return await this.rolesService.getRoleById(id)
  }

  @Mutation((returns) => Role)
  async createRole(
    @Args('data', { type: () => CreateRoleInput }) data: CreateRoleInput,
  ) {
    return await this.rolesService.createRole(data)
  }

  @Mutation((returns) => Role)
  async updateRole(
    @Args('id') id: string,
    @Args('data', { type: () => UpdateRoleInput }) data: UpdateRoleInput,
  ) {
    return await this.rolesService.updateRole(id, data)
  }

  @Mutation((returns) => Role)
  async deleteRole(@Args('id') id: string) {
    return await this.rolesService.deleteRole(id)
  }
}
