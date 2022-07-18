import { ApiProperty } from '@nestjs/swagger';

export class ProblemEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  problem_title: String;

  @ApiProperty()
  platform: String;

  @ApiProperty()
  link: String;

  @ApiProperty()
  difficulty: String;

  @ApiProperty()
  type: String;

  constructor(partial: Partial<ProblemEntity>) {
    Object.assign(this, partial);
  }
}
