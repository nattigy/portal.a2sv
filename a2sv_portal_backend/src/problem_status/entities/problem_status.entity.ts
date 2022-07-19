import { ApiProperty } from '@nestjs/swagger';

export class ProblemStatus {
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
  time_taken: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  type: string;

  @ApiProperty()
  solution_code: string;
}
