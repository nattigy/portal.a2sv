import { Injectable } from '@nestjs/common';
import { CreateGroupContestInput } from './dto/create-group-contest.input';
import { UpdateGroupContestInput } from './dto/update-group-contest.input';
import {PrismaService} from "../prisma.service";

@Injectable()
export class GroupContestService {
  constructor(private readonly prismaService: PrismaService) {
  }

  create(createGroupContestInput: CreateGroupContestInput) {
    return this.prismaService.groupContest.create({
      data: createGroupContestInput
    })
  }

  findAll() {
    return `This action returns all groupContest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupContest`;
  }

  update(id: number, updateGroupContestInput: UpdateGroupContestInput) {
    return `This action updates a #${id} groupContest`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupContest`;
  }
}
