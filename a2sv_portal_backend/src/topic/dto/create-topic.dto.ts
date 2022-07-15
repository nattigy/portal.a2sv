import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTopicDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  topic_name: string;
}
