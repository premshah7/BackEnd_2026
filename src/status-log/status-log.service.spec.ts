import { Test, TestingModule } from '@nestjs/testing';
import { StatusLogService } from './status-log.service';

describe('StatusLogService', () => {
  let service: StatusLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusLogService],
    }).compile();

    service = module.get<StatusLogService>(StatusLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
