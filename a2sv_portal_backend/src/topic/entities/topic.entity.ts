import { ApiProperty } from '@nestjs/swagger';
import { Topic, Prisma } from '@prisma/client';

export class TopicEntity implements Topic {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  seaon_id: number;

  @ApiProperty()
  topic_name: string;

  constructor(partial: Partial<TopicEntity>) {
    Object.assign(this, partial);
  }
}
