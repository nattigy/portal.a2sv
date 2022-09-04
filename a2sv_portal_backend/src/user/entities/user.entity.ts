import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql'
import { Status } from '@prisma/client'
import { GroupTopicProblem } from 'src/groups/entities/group-topic-problem.entity'
import { Group } from 'src/groups/entities/group.entity'
import { RoleEnum } from '../../roles/interfaces/role.enum'

@ObjectType()
export class User {
  @Field(() => ID)
  id: number
  @Field(() => RoleEnum)
  role: RoleEnum
  @Field({})
  email: string
  @Field(() => Status)
  status: Status
  @Field(() => Group, { nullable: true })
  group?: Group
  @Field(() => Int)
  groupId?: number
  @Field(() => [GroupTopicProblem], { nullable: true })
  groupTopicProblems?: GroupTopicProblem[]
  @Field(() => Group, { nullable: true })
  headToGroup?: Group
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}

registerEnumType(Status, {
  name: 'Status',
})
