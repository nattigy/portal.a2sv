import { PartialType } from '@nestjs/swagger';
import { CreateProblemStatusDto } from './create-problem_status.dto';

export class UpdateProblemStatusDto extends PartialType(
  CreateProblemStatusDto,
) {}
