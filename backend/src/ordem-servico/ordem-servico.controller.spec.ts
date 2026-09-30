import { Test, TestingModule } from '@nestjs/testing';
import { OrdemServicoController } from './ordem-servico.controller.js';
import { OrdemServicoService } from './ordem-servico.service.js';

describe('OrdemServicoController', () => {
  let controller: OrdemServicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdemServicoController],
      providers: [OrdemServicoService],
    }).compile();

    controller = module.get<OrdemServicoController>(OrdemServicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
