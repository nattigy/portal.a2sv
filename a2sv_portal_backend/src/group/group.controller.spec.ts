import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

describe('GroupController', () => {
  let controller: GroupController;
  let service: GroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [GroupController],
      providers: [GroupService],
    }).compile();

    controller = module.get<GroupController>(GroupController);
    service = module.get<GroupService>(GroupService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Group API', () => {
    describe('findAll', () => {
      describe('when called', () => {
        it('should return an array of groups', async () => {
          const expectedValues: any = [
            {
              id: 1,
              createdAt: '2022-07-11T11:27:53.364Z',
              updatedAt: '2022-07-11T12:02:10.917Z',
              region_id: 1,
              group_name: 'G33',
              group_size: 9,
              status: 'active',
            },
            {
              id: 2,
              createdAt: '2022-07-11T11:27:53.364Z',
              updatedAt: '2022-07-11T12:02:10.917Z',
              region_id: 1,
              group_name: 'G32',
              group_size: 19,
              status: 'active',
            },
            {
              id: 3,
              createdAt: '2022-07-11T11:27:53.364Z',
              updatedAt: '2022-07-11T12:02:10.917Z',
              region_id: 1,
              group_name: 'G30',
              group_size: 9,
              status: 'active',
            },
          ];
          jest
            .spyOn(service, 'findAll')
            .mockImplementation(() => expectedValues);

          expect(
            await controller.findAll({
              limit: 0,
              offset: 0,
            }),
          ).toEqual(expectedValues);
        });
      });
    });

    describe('findAllBatches', () => {
      describe('when called', () => {
        it('should return an array of groups', async () => {
          const expectedValues: any = [
            {
              id: 1,
              createdAt: '2022-07-11T11:27:53.364Z',
              updatedAt: '2022-07-11T12:02:10.917Z',
              region_id: 1,
              group_name: 'G33',
              group_size: 9,
              parentId: null,
              status: 'active',
            },
            {
              id: 2,
              createdAt: '2022-07-11T11:27:53.364Z',
              updatedAt: '2022-07-11T12:02:10.917Z',
              region_id: 1,
              parentId: null,
              group_name: 'G32',
              group_size: 19,
              status: 'active',
            },
            {
              id: 3,
              createdAt: '2022-07-11T11:27:53.364Z',
              updatedAt: '2022-07-11T12:02:10.917Z',
              region_id: 1,
              parentId: null,
              group_name: 'G30',
              group_size: 9,
              status: 'active',
            },
          ];
          jest
            .spyOn(service, 'findAllBatches')
            .mockImplementation(() => expectedValues);

          expect(
            await controller.findAllBatches({
              limit: 0,
              offset: 0,
            }),
          ).toEqual(expectedValues);
        });
      });
    });

    describe('findAllInBatches', () => {
      describe('when called', () => {
        it('should return an array of groups', async () => {
          const expectedValues: any = [
            {
              id: 1,
              createdAt: '2022-07-11T11:27:53.364Z',
              updatedAt: '2022-07-11T12:02:10.917Z',
              region_id: 1,
              group_name: 'G33',
              group_size: 9,
              parentId: 1,
              status: 'active',
            },
            {
              id: 2,
              createdAt: '2022-07-11T11:27:53.364Z',
              updatedAt: '2022-07-11T12:02:10.917Z',
              region_id: 1,
              parentId: 1,
              group_name: 'G32',
              group_size: 19,
              status: 'active',
            },
            {
              id: 3,
              createdAt: '2022-07-11T11:27:53.364Z',
              updatedAt: '2022-07-11T12:02:10.917Z',
              region_id: 1,
              parentId: 1,
              group_name: 'G30',
              group_size: 9,
              status: 'active',
            },
          ];
          const batchId = 1;
          jest
            .spyOn(service, 'findAllInBatches')
            .mockImplementation(() => expectedValues);

          expect(await controller.findAllInBatches(batchId)).toEqual(
            expectedValues,
          );
        });
      });
    });

    describe('findOne', () => {
      describe('when called with existing group ID', () => {
        it('should return GroupEntity', async () => {
          const groupId = 1;
          const expectedValue: any = {
            id: 1,
            createdAt: '2022-07-11T11:27:53.364Z',
            updatedAt: '2022-07-11T12:02:10.917Z',
            region_id: 1,
            group_name: 'G33',
            group_size: 9,
            status: 'active',
          };
          jest
            .spyOn(service, 'findOne')
            .mockImplementation(() => expectedValue);

          expect(await controller.findOne(groupId)).toEqual(expectedValue);
        });
      });

      describe('otherwise', () => {
        it('should send error', async () => {
          const groupId = 1;
          jest.spyOn(service, 'findOne').mockImplementation((groupId): any => {
            throw new HttpException(
              `Group #${groupId} not found`,
              HttpStatus.NOT_FOUND,
            );
          });
          try {
            await controller.findOne(groupId);
          } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toEqual(`Group #${groupId} not found`);
          }
        });
      });
    });

    describe('create', () => {
      describe('when given needed fields', () => {
        it('should create group', async () => {
          const expectedGroup: any = {
            id: 1,
            createdAt: '2022-07-11T11:27:53.364Z',
            updatedAt: '2022-07-11T12:02:10.917Z',
            region_id: 1,
            group_name: 'G33',
            group_size: 9,
            status: 'active',
          };

          jest.spyOn(service, 'create').mockImplementation(() => expectedGroup);

          expect(await controller.create(expectedGroup)).toEqual(expectedGroup);
        });
      });
    });

    describe('update', () => {
      describe('when given existing group id', () => {
        it('should update the group', async () => {
          const groupId = 1;
          const groupBody: any = {
            group_size: 200,
            status: 'active',
          };
          const expectedGroup: any = {
            id: groupId,
            createdAt: '2022-07-11T11:27:53.364Z',
            updatedAt: '2022-07-11T12:02:10.917Z',
            region_id: 1,
            group_name: 'G33',
            group_size: 200,
            status: 'active',
          };
          jest.spyOn(service, 'update').mockImplementation(() => expectedGroup);

          const group = await controller.update(groupId, groupBody);
          expect(group).toEqual(expectedGroup);
        });
      });

      describe('otherwise', () => {
        it('should throw an exception', async () => {
          const groupId = 1;
          jest.spyOn(service, 'update').mockImplementation((groupId) => {
            throw new HttpException(
              `Group #${groupId} not found`,
              HttpStatus.NOT_FOUND,
            );
          });

          try {
            await controller.update(groupId, {});
          } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toEqual(`Group #${groupId} not found`);
          }
        });
      });
    });

    describe('remove', () => {
      describe('when given existing group id', () => {
        it('should remove the group', async () => {
          const groupId = 1;
          const expectedOutput = { message: 'successfully deleted' };
          jest
            .spyOn(service, 'remove')
            .mockImplementation((): any => expectedOutput);

          expect(await controller.remove(groupId)).toEqual(expectedOutput);
        });
      });

      describe('otherwise', () => {
        it('should throw an exception', async () => {
          const groupId = 1;
          jest.spyOn(service, 'remove').mockImplementation((groupId): any => {
            throw new HttpException(
              `Group #${groupId} not found`,
              HttpStatus.NOT_FOUND,
            );
          });
          try {
            await controller.remove(groupId);
          } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toEqual(`Group #${groupId} not found`);
          }
        });
      });
    });
  });
});
