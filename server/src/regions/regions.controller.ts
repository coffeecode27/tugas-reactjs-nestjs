import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  // UploadedFile,
  // UseInterceptors,
} from '@nestjs/common';
import { RegionsService } from './regions.service';
// import { FileInterceptor } from '@nestjs/platform-express';

@Controller('regions')
export class RegionsController {
  constructor(private Services: RegionsService) {}

  @Get()
  public async getAll() {
    const regions = await this.Services.findAll();
    return { data: regions };
  }
  @Get(':ids')
  public async getOne(@Param('ids') ids: number) {
    return this.Services.findOne(ids);
  }
  @Post()
  public async create(@Body('name') name: string) {
    const region = await this.Services.Insert(name);
    return { data: region };
  }
  @Put(':id')
  public async update(@Param('id') id: number, @Body('name') name: string) {
    const updatedRegion = await this.Services.update(id, name);
    return { data: updatedRegion };
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return this.Services.Delete(id);
  }
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // public async Upload(@UploadedFile() file, @Body('name') name: string) {
  //   return this.Services.Upload(file, name);
  // }
}
