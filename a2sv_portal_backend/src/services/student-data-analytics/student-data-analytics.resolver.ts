import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentDataAnalyticsService } from './student-data-analytics.service';
import { StudentDataAnalytic } from './entities/student-data-analytic.entity';
import { CreateStudentDataAnalyticInput } from './dto/create-student-data-analytic.input';
import { UpdateStudentDataAnalyticInput } from './dto/update-student-data-analytic.input';

@Resolver(() => StudentDataAnalytic)
export class StudentDataAnalyticsResolver {
  constructor(private readonly studentDataAnalyticsService: StudentDataAnalyticsService) {}

  @Mutation(() => StudentDataAnalytic)
  createStudentDataAnalytic(@Args('createStudentDataAnalyticInput') createStudentDataAnalyticInput: CreateStudentDataAnalyticInput) {
    return this.studentDataAnalyticsService.create(createStudentDataAnalyticInput);
  }

  @Query(() => [StudentDataAnalytic], { name: 'studentDataAnalytics' })
  findAll() {
    return this.studentDataAnalyticsService.findAll();
  }

  @Query(() => StudentDataAnalytic, { name: 'studentDataAnalytic' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.studentDataAnalyticsService.findOne(id);
  }

  @Mutation(() => StudentDataAnalytic)
  updateStudentDataAnalytic(@Args('updateStudentDataAnalyticInput') updateStudentDataAnalyticInput: UpdateStudentDataAnalyticInput) {
    return this.studentDataAnalyticsService.update(updateStudentDataAnalyticInput.id, updateStudentDataAnalyticInput);
  }

  @Mutation(() => StudentDataAnalytic)
  removeStudentDataAnalytic(@Args('id', { type: () => Int }) id: number) {
    return this.studentDataAnalyticsService.remove(id);
  }
}
