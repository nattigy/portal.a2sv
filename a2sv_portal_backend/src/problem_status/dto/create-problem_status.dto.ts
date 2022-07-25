import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';
import { Status } from '../enum/problem.status.enum';

export class CreateProblemStatusDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  user_id: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  problem_id: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Status)
  @ApiProperty({ enum: Object.values(Status) })
  status: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty()
  github_link: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  number_of_tries: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  time_taken: number;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  date: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  language_code: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  solution_code: string;
}
