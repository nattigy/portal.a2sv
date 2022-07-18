import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProblemDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  problem_title: String;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  platform: String;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  link: String;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  difficulty: String;

  @IsString()
  @IsEmpty()
  @ApiProperty()
  type: String;
}
