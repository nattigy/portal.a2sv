import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  region_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  group_name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  group_size: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  status: string; // active, inactive, removed
}
