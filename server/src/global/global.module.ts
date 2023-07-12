import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regions } from 'output/entities/Regions';
import { RegionsController } from 'src/regions/regions.controller';
import { RegionsService } from 'src/regions/regions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Regions])],
  providers: [RegionsService],
  controllers: [RegionsController],
  exports: [],
})
export class GlobalModule {}
