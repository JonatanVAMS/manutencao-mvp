import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      status: 'API Online e Operacional 🟢',
      sistema: 'MaintFlow - MVP de Engenharia de Manutenção',
      banco_de_dados: 'Conectado (PostgreSQL)',
      endpoints_disponiveis: [
        'GET, POST, PATCH, DELETE -> /equipamentos',
        'GET, POST, PATCH, DELETE -> /ordem-servico'
      ],
      versao: '1.0.0'
    };
  }
}