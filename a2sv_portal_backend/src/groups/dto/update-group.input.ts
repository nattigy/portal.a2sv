import { Field, InputType, Int } from '@nestjs/graphql'
import { PartialType } from '@nestjs/mapped-types'
import { CreateGroupInput } from './create-group.input'

@InputType()
export class UpdateGroupInput extends PartialType(CreateGroupInput) {}
