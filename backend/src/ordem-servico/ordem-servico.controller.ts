import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdemServicoService } from './ordem-servico.service';
import { Prisma } from '@prisma/client';

@Controller('ordem-servico')
export class OrdemServicoController {
  constructor(private readonly ordemServicoService: OrdemServicoService) {}

  @Post()
  create(@Body() data: Prisma.OrdemServicoUncheckedCreateInput) {
    return this.ordemServicoService.create(data);
  }

  @Get()
  findAll() {
    return this.ordemServicoService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.OrdemServicoUpdateInput) {
    return this.ordemServicoService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordemServicoService.remove(+id);
  }
}