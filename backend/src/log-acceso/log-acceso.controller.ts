import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogAccesoService } from './log-acceso.service';
import { CreateLogAccesoDto } from './dto/create-log-acceso.dto';
import { UpdateLogAccesoDto } from './dto/update-log-acceso.dto';

@Controller('log-acceso')
export class LogAccesoController {
  constructor(private readonly logAccesoService: LogAccesoService) {}

  @Post()
  create(@Body() createLogAccesoDto: CreateLogAccesoDto) {
    return this.logAccesoService.create(createLogAccesoDto);
  }

  @Get()
  findAll() {
    return this.logAccesoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logAccesoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogAccesoDto: UpdateLogAccesoDto) {
    return this.logAccesoService.update(+id, updateLogAccesoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logAccesoService.remove(+id);
  }
}
