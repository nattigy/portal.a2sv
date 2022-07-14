import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTopicDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  season_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  topic_name: string;
}
