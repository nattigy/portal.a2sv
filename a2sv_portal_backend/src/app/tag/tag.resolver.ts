import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateTagInput } from './dto/create-tag.input'
import { UpdateTagInput } from './dto/update-tag.input'
import { Tag } from './entities/tag.entity'
import { TagService } from './tag.service'

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation(() => Tag)
  async createTag(@Args('createTagInput') createTagInput: CreateTagInput): Promise<Tag> {
    return await this.tagService.create(createTagInput)
  }

  @Query(() => [Tag], { name: 'tags' })
  async tags(filter?: any): Promise<Tag[]> {
    return await this.tagService.findAll(filter)
  }

  // @Query(() => Tag, { name: 'tag' })
  // async tag(@Args('id', { type: () => Int }) id: number): Promise<Tag> {
  //   return await this.tagService.findOne(id)
  // }

  @Mutation(() => Tag)
  async updateTag(@Args('updateTagInput') updateTagInput: UpdateTagInput): Promise<Tag> {
    return await this.tagService.update(updateTagInput.id, updateTagInput)
  }

  @Mutation(() => Tag)
  async removeTag(@Args('id', { type: () => Int }) id: string): Promise<Tag> {
    return await this.tagService.remove(id)
  }
}
