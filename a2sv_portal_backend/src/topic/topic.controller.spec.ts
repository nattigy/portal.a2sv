import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';

describe('TopicController', () => {
  let controller: TopicController;
  let service: TopicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicController],
      providers: [TopicService, PrismaService],
    }).compile();

    controller = module.get<TopicController>(TopicController);
    service = module.get<TopicService>(TopicService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Topic API', () => {
    describe('findAll', () => {
      it('should return an array of topics', async () => {
        const expectedValues: any = [
          {
            id: 1,
            topic_name: 'Topic One',
          },
          {
            id: 2,
            topic_name: 'Topic Two',
          },
          {
            id: 2,
            topic_name: 'Topic Three',
          },
        ];

        jest.spyOn(service, 'findAll').mockImplementation(() => expectedValues);

        expect(await controller.findAll({
          limit: 0,
          offset: 0
        })).toEqual(expectedValues);
      });
    });

    describe('findOne', () => {
      describe('when called with existing Topic ID', () => {
        it('should return TopicEntity', async () => {
          const topicId = 1;
          const expectedValue: any = {
            id: 1,
            createdAt: '2022-07-11T11:27:53.364Z',
            updatedAt: '2022-07-11T12:02:10.917Z',
            topic_name: 'Topic One',
          };

          jest
            .spyOn(service, 'findOne')
            .mockImplementation(() => expectedValue);

          expect(await controller.findOne(topicId)).toEqual(expectedValue);
        });
      });

      describe('otherwise', () => {
        it('should send error', async () => {
          const topicId = 1;
          jest.spyOn(service, 'findOne').mockImplementation((topicId) => {
            throw new HttpException(
              `Topic #${topicId} not found`,
              HttpStatus.NOT_FOUND,
            );
          });

          try {
            await controller.findOne(topicId);
          } catch (err) {
            expect(err).toBeInstanceOf(HttpException);
            expect(err.message).toEqual(`Topic #${topicId} not found`);
          }
        });
      });
    });

    describe('create', () => {
      describe('when given needed fields', () => {
        it('should create Topic', async () => {
          const expectedTopic: any = {
            id: 1,
            createdAt: '2022-07-11T11:27:53.364Z',
            updatedAt: '2022-07-11T12:02:10.917Z',
            topic_name: 'Topic One',
          };

          jest.spyOn(service, 'create').mockImplementation(() => expectedTopic);

          expect(await controller.create(expectedTopic)).toEqual(expectedTopic);
        });
      });
    });

    describe('update', () => {
      describe('when given existing topic id', () => {
        it('should update the topic', async () => {
          const topicId = 1;
          const topicBody: any = {
            topic_name: 'topic changed',
          };

          const expectedTopic: any = {
            id: topicId,
            createdAt: '2022-07-11T11:27:53.364Z',
            updatedAt: '2022-07-11T12:02:10.917Z',
            topic_name: 'topic changed',
          };

          jest.spyOn(service, 'update').mockImplementation(() => expectedTopic);

          const topic = await controller.update(topicId, topicBody);
          expect(topic).toEqual(expectedTopic);
        });

        describe('otherwise', () => {
          it('should throw an exception', async () => {
            const topicId = 1;
            jest.spyOn(service, 'update').mockImplementation((topicId) => {
              throw new HttpException(
                `Topic #${topicId} not found`,
                HttpStatus.NOT_FOUND,
              );
            });

            try {
              await controller.update(topicId, {});
            } catch (err) {
              expect(err).toBeInstanceOf(HttpException);
              expect(err.message).toEqual(`Topic #${topicId} not found`);
            }
          });
        });
      });
    });

    describe('remove', () => {
      describe('when given existing topic id', () => {
        it('should remove the Topic', async () => {
          const topicId = 1;
          const expectedOutput: any = { message: 'successfully deleted' };
          jest
            .spyOn(service, 'remove')
            .mockImplementation(() => expectedOutput);

          expect(await controller.remove(topicId)).toEqual(expectedOutput);
        });
      });

      describe('otherwise', () => {
        it('should throw an exception', async () => {
          const topicId = 1;
          jest.spyOn(service, 'remove').mockImplementation((topicId) => {
            throw new HttpException(
              `Topic #${topicId} not found`,
              HttpStatus.NOT_FOUND,
            );
          });

          try {
            await controller.remove(topicId);
          } catch (err) {
            expect(err).toBeInstanceOf(HttpException);
            expect(err.message).toEqual(`Topic #${topicId} not found`);
          }
        });
      });
    });
  });
});
