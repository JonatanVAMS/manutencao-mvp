import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdemServicoService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.OrdemServicoUncheckedCreateInput) {
    return this.prisma.ordemServico.create({ data });
  }

  findAll() {
    return this.prisma.ordemServico.findMany({
      include: { equipamento: true },
      orderBy: { id: 'desc' }
    });
  }

  update(id: number, data: Prisma.OrdemServicoUpdateInput) {
    return this.prisma.ordemServico.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.ordemServico.delete({ where: { id } });
  }
}