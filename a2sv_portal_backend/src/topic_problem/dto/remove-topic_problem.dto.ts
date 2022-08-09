import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class RemoveTopicProblemDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  topic_id: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  problem_id: number;
}
