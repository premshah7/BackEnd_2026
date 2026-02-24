import { Test, TestingModule } from '@nestjs/testing';
import { StatusLogController } from './status-log.controller';

describe('StatusLogController', () => {
  let controller: StatusLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusLogController],
    }).compile();

    controller = module.get<StatusLogController>(StatusLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
