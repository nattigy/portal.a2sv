import { Test, TestingModule } from '@nestjs/testing'
import { PaginationGroup } from 'src/common/page/pagination-info'
import { CreateGroupInput } from '../dto/create-group.input'
import { UpdateGroupInput } from '../dto/update-group.input'
import { Group } from '../entities/group.entity'
import { GroupsResolver } from '../groups.resolver'
import { GroupsService } from '../groups.service'
import { groupStub } from './stubs/group.stub'
import { GroupServiceMock } from './__mocks__/group-service.mock'

describe('GroupResolver', () => {
  let resolver: GroupsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupsService, GroupsResolver],
    })
      .overrideProvider(GroupsService)
      .useValue(GroupServiceMock)
      .compile()

    resolver = module.get<GroupsResolver>(GroupsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createGroup', () => {
    describe('when called should create group', () => {
      let group: Group
      let createGroupDto: CreateGroupInput

      beforeEach(async () => {
        createGroupDto = {
          name: groupStub().name,
          country: groupStub().country,
          school: groupStub().school,
        }
        group = await resolver.createGroup(createGroupDto)
      })

      it('should be called with createGroupDto argument', async () => {
        jest.spyOn(resolver, 'createGroup').getMockImplementation()
        expect(await resolver.createGroup(createGroupDto)).toEqual(groupStub())
        expect(resolver.createGroup).toHaveBeenCalledWith(createGroupDto)
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
        group = await resolver.group(groupStub().id)
      })

      it('should be called with groupId argument', async () => {
        jest.spyOn(resolver, 'group').getMockImplementation()
        expect(await resolver.group(groupStub().id)).toEqual(groupStub())
        expect(resolver.group).toHaveBeenCalledWith(groupStub().id)
      })

      it('should return a group', async () => {
        expect(group).toEqual(groupStub())
      })
    })
  })

  describe('groups', () => {
    describe('when called should return list of groups', () => {
      let groups: PaginationGroup

      beforeEach(async () => {
        groups = await resolver.groups()
      })

      it('should return list of groups', async () => {
        expect(groups).toEqual([groupStub()])
      })

      it('should return a list of length one', () => {
        expect(groups).toHaveLength(1)
      })
    })
  })

  describe('updateGroup', () => {
    describe('when called should update group', () => {
      let group: Group
      let updateGroupDto: UpdateGroupInput

      beforeEach(async () => {
        updateGroupDto = {
          groupId: groupStub().id,
          name: groupStub().name,
        }
        group = await resolver.updateGroup(updateGroupDto)
      })

      it('should be called with updateGroupDto argument', async () => {
        jest.spyOn(resolver, 'updateGroup').getMockImplementation()
        expect(await resolver.updateGroup(updateGroupDto)).toEqual(groupStub())
        expect(resolver.updateGroup).toHaveBeenCalledWith(updateGroupDto)
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
        result = await resolver.removeGroup(groupStub().id)
      })

      it('should be called with groupId argument', async () => {
        jest.spyOn(resolver, 'removeGroup').getMockImplementation()
        expect(await resolver.removeGroup(groupStub().id)).toEqual(1)
        expect(resolver.removeGroup).toHaveBeenCalledWith(groupStub().id)
      })

      it('should return a number', () => {
        expect(result).toEqual(1)
      })
      
    })
  })
})
