import {Injectable} from '@nestjs/common';
import {CreateSeasonTopicProblemInput} from './dto/create-season-topic-problem.input';
import {UpdateSeasonTopicProblemInput} from './dto/update-season-topic-problem.input';
import {SeasonTopicProblem} from "./entities/season-topic-problem.entity";
import {SeasonTopicProblemId} from "./season-topic-problem.resolver";

@Injectable()
export class SeasonTopicProblemService {
    create(createSeasonTopicProblemInput: CreateSeasonTopicProblemInput) {
        return 'This action adds a new seasonTopicProblem';
    }

    findAll() {
        return `This action returns all seasonTopicProblem`;
    }

    findOne(id: number) {
        return `This action returns a #${id} seasonTopicProblem`;
    }

    update(updateSeasonTopicProblemInput: UpdateSeasonTopicProblemInput) {
        return `This action updates a #${updateSeasonTopicProblemInput} seasonTopicProblem`;
    }

    remove(id: SeasonTopicProblemId) {
        return `This action removes a #${id} seasonTopicProblem`;
    }
}
