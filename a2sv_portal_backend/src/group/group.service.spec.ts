import {
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../singleton';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupService } from './group.service';

describe('GroupService', () => {
  let service: GroupService;
  let prismaService;

  beforeAll(async () => {
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

  describe('findAll', () => {
    describe('when called', () => {
      it('should display all groups', async () => {
        const expectedGroups = [{}, {}];
        prismaService.group.findMany.mockReturnValue(expectedGroups);

        const groups = await service.findAll();
        expect(groups).toEqual(expectedGroups);
      });
    });
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
      it('should throw the HttpException with code 404', async () => {
        const groupId = '1';

        prismaService.group.findUnique.mockReturnValue(undefined);

        try {
          await service.findOne(groupId);
        } catch (err) {
          expect(err).toBeInstanceOf(HttpException);
          expect(err.message).toEqual(`Group #${groupId} not found`);
          expect(err.status).toEqual(404);
        }
      });
    });
  });

  describe('update', () => {
    describe('when group with id exsit', () => {
      it('should update the group', async () => {
        const groupId: string = '1';
        const expectedGroup = {
          id: groupId,
          createdAt: '2022-07-11T11:27:53.364Z',
          updatedAt: '2022-07-11T12:02:10.917Z',
          region_id: 1,
          group_name: 'G33',
          group_size: 9,
          status: 'active',
        };

        prismaService.group.update.mockResolvedValue(expectedGroup);
        prismaService.group.findUnique.mockReturnValue(expectedGroup);

        const group = await service.update(
          groupId,
          new UpdateGroupDto({
            group_name: 'G33',
            group_size: 9,
          }),
        );
        expect(group).toEqual(expectedGroup);
      });
    });

    describe('otherwise', () => {
      it('should throw an HttpException with 404 status code', async () => {
        const groupId = '1';

        prismaService.group.findUnique.mockReturnValue(undefined);

        try {
          await service.update(groupId, {});
        } catch (err) {
          expect(err).toBeInstanceOf(HttpException);
          expect(err.message).toEqual(`Group #${groupId} not found`);
          expect(err.status).toEqual(404);
        }
      });
    });
  });

  describe('create', () => {
    describe('when given needed fields', () => {
      it('should create group', async () => {
        const expectedGroup = {
          id: 1,
          createdAt: '2022-07-11T11:27:53.364Z',
          updatedAt: '2022-07-11T12:02:10.917Z',
          region_id: 1,
          group_name: 'G33',
          group_size: 9,
          status: 'active',
        };

        prismaService.group.create.mockReturnValue(expectedGroup);

        const data: CreateGroupDto = {
          region_id: 1,
          group_name: 'G33',
          group_size: 9,
          status: 'active',
        };
        const group = await service.create(data);
        expect(group).toEqual(expectedGroup);
      });
    });
  });

  describe('remove', () => {
    describe('when group with id exists', () => {
      it('should remove group', async () => {
        const groupId = '1';
        const expectedValue = {};

        prismaService.group.findUnique.mockReturnValue({});
        prismaService.group.delete.mockResolvedValue({});
        const removed = await service.remove(groupId);
        expect(removed).toEqual(expectedValue);
      });
    });

    describe('otherwise', () => {
      it('should throw HttpException with 404 status code', async () => {
        const groupId = '1';

        prismaService.group.findUnique.mockReturnValue({});
        prismaService.group.delete.mockResolvedValue({});

        try {
          await service.remove(groupId);
        } catch (err) {
          expect(err).toBeInstanceOf(HttpException);
          expect(err.message).toEqual(`Group #${groupId} not found`);
          expect(err.status).toEqual(404);
        }
      });
    });
  });
});
