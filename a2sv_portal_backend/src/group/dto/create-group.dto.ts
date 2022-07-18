import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../enum/group.status.enum';

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

  @IsOptional()
  @IsInt()
  @ApiProperty()
  parentId: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Status)
  @ApiProperty({ enum: Object.values(Status) })
  status: string;
}
