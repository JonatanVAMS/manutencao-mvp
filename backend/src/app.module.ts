import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EquipamentosModule } from './equipamentos/equipamentos.module';
import { OrdemServicoModule } from './ordem-servico/ordem-servico.module';

@Module({
  imports: [PrismaModule, EquipamentosModule, OrdemServicoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}