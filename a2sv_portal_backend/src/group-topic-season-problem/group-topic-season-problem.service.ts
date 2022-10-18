import {Injectable} from '@nestjs/common'
import {CreateGroupTopicSeasonProblemInput} from './dto/create-group-topic-season-problem.input'
import {UpdateGroupTopicSeasonProblemInput} from './dto/update-group-topic-season-problem.input'
import {PrismaService} from "../prisma.service";

@Injectable()
export class GroupTopicSeasonProblemService {
    constructor(private readonly prismaService: PrismaService) {
    }

    create(
        createGroupTopicSeasonProblemInput: CreateGroupTopicSeasonProblemInput,
    ) {
        return this.prismaService.groupTopicSeasonProblem.create({
            data: createGroupTopicSeasonProblemInput, include: {
                problem: true,

            }
        })
    }

    findAll() {
        return this.prismaService.groupTopicSeasonProblem.findMany({
            include: {
                problem: true,
            }
        })
    }

    findOne({
                problemId,
                groupId,
                seasonId,
                topicId,
            }: UpdateGroupTopicSeasonProblemInput) {
        return this.prismaService.groupTopicSeasonProblem.findUnique({
            where: {
                problemId_groupId_topicId_seasonId: {
                    problemId: problemId,
                    groupId: groupId,
                    seasonId: seasonId,
                    topicId: topicId
                }
            },
            include: {
                problem: true
            }
        })
    }

    update({
               problemId,
               groupId,
               topicId,
               seasonId,
               ...updates
           }: UpdateGroupTopicSeasonProblemInput,
    ) {
        return this.prismaService.groupTopicSeasonProblem.update({
            where: {
                problemId_groupId_topicId_seasonId: {
                    problemId: problemId,
                    groupId: groupId,
                    topicId: topicId,
                    seasonId: seasonId
                },
            },
            data: updates,
            include: {
                problem: true
            }
        })
    }

    remove(id: number) {
        return `This action removes a #${id} groupTopicSeasonProblem`
    }
}
