import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProblemDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  problem_title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  platform: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  link: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  difficulty: string;

  @IsString()
  @IsEmpty()
  @ApiProperty()
  type: string;
}
