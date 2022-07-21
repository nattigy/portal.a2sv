import { PartialType } from '@nestjs/swagger';
import { CreateTopicProblemDto } from './create-topic_problem.dto';

export class UpdateTopicProblemDto extends PartialType(CreateTopicProblemDto) {}
