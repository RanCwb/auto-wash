import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto) {
    const isServiceExist = await this.prisma.service.findFirst({
      where: {
        name: createServiceDto.name,
      },
    });

    if (isServiceExist) {
      throw new BadRequestException('Service already exists');
    }

    try {
      const service = this.prisma.service.create({
        data: {
          name: createServiceDto.name,
          description: createServiceDto.description,
          price: createServiceDto.price,
          duration: createServiceDto.duration,
        },
      });

      return service;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all service`;
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
