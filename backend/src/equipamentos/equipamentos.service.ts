import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EquipamentosService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.EquipamentoCreateInput) {
    return this.prisma.equipamento.create({ data });
  }

  findAll() {
    return this.prisma.equipamento.findMany();
  }

  findOne(id: number) {
    return this.prisma.equipamento.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.EquipamentoUpdateInput) {
    return this.prisma.equipamento.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.equipamento.delete({ where: { id } });
  }
}