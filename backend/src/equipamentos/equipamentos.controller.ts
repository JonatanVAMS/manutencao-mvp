import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipamentosService } from './equipamentos.service';
import { Prisma } from '@prisma/client';

@Controller('equipamentos')
export class EquipamentosController {
  constructor(private readonly equipamentosService: EquipamentosService) {}

  @Post()
  create(@Body() data: Prisma.EquipamentoCreateInput) {
    return this.equipamentosService.create(data);
  }

  @Get()
  findAll() {
    return this.equipamentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipamentosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.EquipamentoUpdateInput) {
    return this.equipamentosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipamentosService.remove(+id);
  }
}