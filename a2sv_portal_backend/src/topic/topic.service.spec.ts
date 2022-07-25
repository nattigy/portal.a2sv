import { Test, TestingModule } from '@nestjs/testing';
import { TopicService } from './topic.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../singleton';
import { NotFoundException } from '@nestjs/common';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { CreateTopicDto } from './dto/create-topic.dto';

describe('TopicService', () => {
  let service: TopicService;
  let prismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TopicService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<TopicService>(TopicService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    describe('when called', () => {
      it('should display all topics', async () => {
        const expectedTopics = [{}, {}];
        prismaService.topic.findMany.mockReturnValue(expectedTopics);

        const topics = await service.findAll({
          limit: 0,
          offset: 0,
        });
        expect(topics).toEqual(expectedTopics);
      });
    });
  });

  describe('findOne', () => {
    describe('when topic with ID exists', () => {
      it('should return the topic object', async () => {
        const topicId = 1;
        const expectedTopic = {};

        prismaService.topic.findUnique.mockReturnValue(expectedTopic);
        const topic = await service.findOne(topicId);
        expect(topic).toEqual(expectedTopic);
      });
    });

    describe('otherwise', () => {
      it('should throw the NotFoundException with code 404', async () => {
        const topicId = 1;
        prismaService.topic.findUnique.mockReturnValue(undefined);

        try {
          await service.findOne(topicId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Topic #${topicId} not found`);
          expect(err.status).toEqual(404);
        }
      });
    });
  });

  describe('update', () => {
    describe('when topic with id exist', () => {
      it('should update the topic', async () => {
        const topicId = 1;
        const expectedTopic = {
          id: topicId,
          createdAt: '2022-07-11T11:27:53.364Z',
          updatedAt: '2022-07-11T12:02:10.917Z',
          topic_name: 'Topic Title',
        };

        prismaService.topic.update.mockResolvedValue(expectedTopic);
        prismaService.topic.findUnique.mockReturnValue(expectedTopic);

        const topic = await service.update(
          topicId,
          new UpdateTopicDto({ topic_name: 'Topic Title' }),
        );
        expect(topic).toEqual(expectedTopic);
      });
    });

    describe('otherwise', () => {
      it('should throw an NotFoundException with 404 status code', async () => {
        const topicId = 1;

        prismaService.topic.findUnique.mockReturnValue(undefined);

        try {
          await service.update(topicId, {});
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Topic #${topicId} not found`);
          expect(err.status).toEqual(404);
        }
      });
    });
  });

  describe('create', () => {
    describe('when given needed fields', () => {
      it('should create topic', async () => {
        const expectedTopic = {
          id: 1,
          createdAt: '2022-07-11T11:27:53.364Z',
          updatedAt: '2022-07-11T12:02:10.917Z',
          topic_name: 'New Topic Title',
        };

        prismaService.topic.create.mockReturnValue(expectedTopic);

        const data: CreateTopicDto = {
          topic_name: 'New Topic Title',
        };

        const topic = await service.create(data);
        expect(topic).toEqual(expectedTopic);
      });
    });
  });

  describe('remove', () => {
    describe('when topic with id exists', () => {
      it('should remove topic', async () => {
        const topicId = 1;
        const expectedValue = {};

        prismaService.topic.findUnique.mockReturnValue(expectedValue);
        prismaService.topic.delete.mockResolvedValue(expectedValue);
        const removed = await service.remove(topicId);
        expect(removed).toEqual(expectedValue);
      });
    });

    describe('otherwise', () => {
      it('should throw NotFoundException with 404 status code', async () => {
        const topicId = 1;
        prismaService.topic.findUnique.mockReturnValue({});
        prismaService.topic.delete.mockResolvedValue({});

        try {
          await service.remove(topicId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err).toEqual(`Topic #${topicId} not found`);
          expect(err).toEqual(404);
        }
      });
    });
  });
});
