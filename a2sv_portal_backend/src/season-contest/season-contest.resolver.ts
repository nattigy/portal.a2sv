import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SeasonContestService } from './season-contest.service';
import { SeasonContest } from './entities/season-contest.entity';
import { CreateSeasonContestInput } from './dto/create-season-contest.input';
import { UpdateSeasonContestInput } from './dto/update-season-contest.input';

@Resolver(() => SeasonContest)
export class SeasonContestResolver {
  constructor(private readonly seasonContestService: SeasonContestService) {}

  @Mutation(() => SeasonContest)
  createSeasonContest(@Args('createSeasonContestInput') createSeasonContestInput: CreateSeasonContestInput) {
    return this.seasonContestService.create(createSeasonContestInput);
  }

  @Query(() => [SeasonContest], { name: 'seasonContest' })
  findAll() {
    return this.seasonContestService.findAll();
  }

  @Query(() => SeasonContest, { name: 'seasonContest' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.seasonContestService.findOne(id);
  }

  @Mutation(() => SeasonContest)
  updateSeasonContest(@Args('updateSeasonContestInput') updateSeasonContestInput: UpdateSeasonContestInput) {
    return this.seasonContestService.update(updateSeasonContestInput.id, updateSeasonContestInput);
  }

  @Mutation(() => SeasonContest)
  removeSeasonContest(@Args('id', { type: () => Int }) id: number) {
    return this.seasonContestService.remove(id);
  }
}
