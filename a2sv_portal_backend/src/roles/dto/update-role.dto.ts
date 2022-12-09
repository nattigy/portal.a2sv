import { InputType, PartialType } from '@nestjs/graphql'
import { CreateRoleInput } from './create-role.dto'

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
}
