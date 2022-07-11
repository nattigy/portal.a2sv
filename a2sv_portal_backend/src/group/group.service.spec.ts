import { HttpException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../singleton';
import { GroupService } from './group.service';

describe('GroupService', () => {
  let service: GroupService;
  let prismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when group with ID exists', () => {
      it('should return the group object', async () => {
        const groupId: string = '1';
        const expectedGroup = {};

        prismaService.group.findUnique.mockReturnValue(expectedGroup);
        const group = await service.findOne(groupId);
        expect(group).toEqual(expectedGroup);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const groupId = '1';
        prismaService.group.findUnique.mockReturnValue(undefined);

        try {
          await service.findOne(groupId);
        } catch (err) {
          expect(err).toBeInstanceOf(HttpException);
          expect(err.message).toEqual(`Group #${groupId} not found`);
        }
      });
    });
  });
});
