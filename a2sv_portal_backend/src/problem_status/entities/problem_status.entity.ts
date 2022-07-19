import { ApiProperty } from '@nestjs/swagger';

export class ProblemStatusEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  problem_id: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  github_link: string;

  @ApiProperty()
  number_of_tries: number;

  @ApiProperty()
  time_taken: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  language_code: string;

  @ApiProperty()
  solution_code: string;

  constructor(partial: Partial<ProblemStatusEntity>) {
    Object.assign(this, partial);
  }
}
