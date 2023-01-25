import { Test, TestingModule } from '@nestjs/testing'

import { PaginationGroup } from 'src/common/page/pagination-info'

import { CreateGroupInput } from '../dto/create-group.input'
import { UpdateGroupInput } from '../dto/update-group.input'
import { Group } from '../entities/group.entity'
import { GroupRepository } from '../group.repository'
import { GroupsService } from '../groups.service'
import { groupStub } from './stubs/group.stub'

import { GroupRepositoryMock } from './__mocks__/group-repository.mock'

describe('GroupService', () => {
  let service: GroupsService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupsService, GroupRepository],
    })
      .overrideProvider(GroupRepository)
      .useValue(GroupRepositoryMock)
      .compile()

    service = module.get<GroupsService>(GroupsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    describe('when given needed fields it should create group', () => {
      let group: Group
      let createGroupDto: CreateGroupInput
      beforeEach(async () => {
        createGroupDto = {
          name: groupStub().name,
          country: groupStub().country,
          school: groupStub().school,
        }

        group = await service.createGroup(createGroupDto)
      })

      it('should be called with createGroupDto argument', async () => {
        jest.spyOn(service, 'createGroup').getMockImplementation()
        expect(await service.createGroup(createGroupDto)).toEqual(groupStub())
        expect(service.createGroup).toHaveBeenCalledWith(createGroupDto)
      })

      it('should return a group', () => {
        expect(group).toEqual(groupStub())
      })
    })
  })

  describe('group', () => {
    describe('when called should return a group', () => {
      let group: Group
      beforeEach(async () => {
        group = await service.group(groupStub().id)
      })
      it('should be called with groupId argument', async () => {
        jest.spyOn(service, 'group').getMockImplementation()
        expect(await service.group(groupStub().id)).toEqual(groupStub())
        expect(service.group).toHaveBeenCalledWith(groupStub().id)
      })

      it('should return a group', async () => {
        expect(group).toEqual(groupStub())
      })
    })
  })

  describe('groups', () => {
    describe('when called it should return all groups', () => {
      let groups: PaginationGroup
      beforeEach(async () => {
        groups = await service.groups({})
      })

      it('should return list of groups', async () => {
        expect(groups.items).toEqual([groupStub()])
      })

      it('should return a list of length one', () => {
        expect(groups).toHaveLength(1)
      })
    })
  })

  describe('update', () => {
    describe('when group with id exist it should update the group', () => {
      let group: Group
      let updateGroupDto: UpdateGroupInput

      beforeEach(async () => {
        updateGroupDto = {
          groupId: groupStub().id,
          country: groupStub().country,
          name: groupStub().name,
          school: groupStub().school,
        }
        group = await service.updateGroup(updateGroupDto)
      })

      it('should be called with the updateGroupDto argument', async () => {
        jest.spyOn(service, 'updateGroup').getMockImplementation()
        expect(await service.updateGroup(updateGroupDto)).toEqual(groupStub())
        expect(service.updateGroup).toHaveBeenCalledWith(updateGroupDto)
      })

      it('should return a group', () => {
        expect(group).toEqual(groupStub())
      })
    })
  })

  describe('removeGroup', () => {
    describe('when called should remove group', () => {
      let result: number
      beforeEach(async () => {
        result = await service.removeGroup(groupStub().id)
      })
      it('should be called with groupID argument', async () => {
        jest.spyOn(service, 'removeGroup').getMockImplementation()
        expect(await service.removeGroup(groupStub().id)).toEqual(1)
        expect(service.removeGroup).toHaveBeenCalledWith(groupStub().id)
      })

      it('should return a number', () => {
        expect(result).toEqual(1)
      })
    })
  })
})
