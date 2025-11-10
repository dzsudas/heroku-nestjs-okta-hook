import { Test, TestingModule } from '@nestjs/testing';
import { OktaController } from './okta.controller';

describe('OktaController', () => {
  let controller: OktaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OktaController],
    }).compile();

    controller = module.get<OktaController>(OktaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
