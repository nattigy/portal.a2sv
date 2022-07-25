import { Group } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class GroupEntity implements Group {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  region_id: number;

  @ApiProperty()
  group_name: string;

  @ApiProperty()
  group_size: number;

  @ApiProperty()
  status: string; // active, inactive, removed

  constructor(partial: Partial<GroupEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  parentId: number;
}
