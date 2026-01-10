import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCarDto } from 'src/dto/car.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  async createCar(dto: CreateCarDto) {
    const ownerIdExists = await this.prisma.user.findUnique({
      where: { id: dto.ownerId },
    });

    if (!ownerIdExists) {
      throw new BadRequestException('Owner not found');
    }

    const plateExists = await this.prisma.car.findUnique({
      where: { plate: dto.plate },
    });

    if (plateExists) {
      throw new BadRequestException('Plate already exists');
    }

    try {
      const car = await this.prisma.car.create({
        data: {
          brand: dto.brand,
          model: dto.model,
          plate: dto.plate,
          ownerId: dto.ownerId,
        },
      });
      return car;
    } catch (error) {
      throw error;
    }
  }
}
