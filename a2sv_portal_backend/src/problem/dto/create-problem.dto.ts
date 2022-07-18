import { IsEmpty, IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TYPE } from '../enum/problem.type.enum';
import { Difficulty } from '../enum/problem.difficulty.enum';
import { Platform } from '../enum/problem.platform.enum';

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

  @IsString()
  @IsNotEmpty()
  @IsEnum(Difficulty)
  @ApiProperty({ enum: Object.values(Difficulty) })
  difficulty: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TYPE)
  @ApiProperty({ enum: Object.values(TYPE) })
  type: string;
}
