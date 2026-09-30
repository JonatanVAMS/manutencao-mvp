import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdemServicoService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.OrdemServicoUncheckedCreateInput) {
    return this.prisma.ordemServico.create({ data });
  }

  findAll() {
    return this.prisma.ordemServico.findMany({
      include: { equipamento: true },
    });
  }

  findOne(id: number) {
    return this.prisma.ordemServico.findUnique({
      where: { id },
      include: { equipamento: true },
    });
  }

  update(id: number, data: Prisma.OrdemServicoUncheckedUpdateInput) {
    return this.prisma.ordemServico.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.ordemServico.delete({ where: { id } });
  }
}