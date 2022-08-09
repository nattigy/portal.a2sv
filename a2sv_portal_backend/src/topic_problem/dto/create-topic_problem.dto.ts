import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateTopicProblemDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  topicId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  problemId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  assignedBy: number;
}
