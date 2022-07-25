import { IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// import { Difficulty } from '../enum/problem.difficulty.enum';
import { Platform } from '../enum/problem.platform.enum';
import { Difficulty } from '@prisma/client';

export class CreateProblemDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  problem_title: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Platform)
  @ApiProperty({ enum: Object.values(Platform) })
  platform: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty()
  link: string;

  @IsNotEmpty()
  @IsEnum(Difficulty)
  @ApiProperty({ enum: Object.values(Difficulty) })
  difficulty: Difficulty;
}
