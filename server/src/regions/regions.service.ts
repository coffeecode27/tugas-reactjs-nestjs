import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Regions } from 'output/entities/Regions';
import { Repository } from 'typeorm';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Regions) private serviceReg: Repository<Regions>,
  ) {}

  public async findAll() {
    return await this.serviceReg.find({
      select: ['regionId', 'regionName'],
    });
  }

  public async findOne(ids: number) {
    return await this.serviceReg.findOne({ where: { regionId: ids } });
  }
  public async Insert(name: string) {
    try {
      const region = await this.serviceReg.save({
        regionName: name,
      });
      return region;
    } catch (error) {
      throw new Error('Failed to create region');
    }
  }
  public async update(id: number, name: string) {
    const region = await this.serviceReg.findOne({ where: { regionId: id } });
    if (!region) {
      throw new NotFoundException('Region not found');
    }
    region.regionName = name;
    const updatedRegion = await this.serviceReg.save(region);
    return updatedRegion;
  }

  public async Delete(id: number) {
    return await this.serviceReg.delete(id);
  }
  // public async Upload(file, name: string) {
  //   try {
  //     const region = await this.serviceReg.save({
  //       regionName: name,
  //       photo: file.originalname,
  //     });
  //     return region;
  //   } catch (error) {
  //     return error.message;
  //   }
  // }
}
