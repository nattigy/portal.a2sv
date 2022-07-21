import { ApiProperty } from '@nestjs/swagger';
import { ProblemOnTopic } from '@prisma/client';

export class ProblemOnTopicEntity implements ProblemOnTopic {
  @ApiProperty()
  topicId: number;
  @ApiProperty()
  problemId: number;
  @ApiProperty()
  assignedAt: Date;
  @ApiProperty()
  assignedBy: number;
}
