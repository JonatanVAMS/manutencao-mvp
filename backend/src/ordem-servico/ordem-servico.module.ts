import { Module } from '@nestjs/common';
import { OrdemServicoService } from './ordem-servico.service';
import { OrdemServicoController } from './ordem-servico.controller';

@Module({
  controllers: [OrdemServicoController],
  providers: [OrdemServicoService],
})
export class OrdemServicoModule {}