import { ApiProperty } from '@nestjs/swagger';

export class ProblemEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  problem_title: string;

  @ApiProperty()
  platform: string;

  @ApiProperty()
  link: string;

  @ApiProperty()
  difficulty: string;

  @ApiProperty()
  type: string;

  constructor(partial: Partial<ProblemEntity>) {
    Object.assign(this, partial);
  }
}
