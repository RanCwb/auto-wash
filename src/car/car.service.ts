import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCarDto } from 'src/dto/car.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  async createCar(dto: CreateCarDto) {
    const { brand, model, plate, ownerId } = dto;

    const ownerIdExists = await this.prisma.user.findUnique({
      where: { id: ownerId },
    });

    if (!ownerIdExists) {
      throw new BadRequestException('Owner not found');
    }

    const plateExists = await this.prisma.car.findUnique({
      where: { plate: plate },
    });

    if (plateExists) {
      throw new BadRequestException('Plate already exists');
    }

    try {
      const car = await this.prisma.car.create({
        data: {
          brand,
          model,
          plate,
          ownerId,
        },
      });
      return car;
    } catch (error) {
      throw error;
    }
  }

  async getCarById(id: string) {
    if (!id) {
      throw new BadRequestException('Id is required');
    }

    try {
      const car = await this.prisma.car.findUnique({
        where: {
          id: id,
        },
      });
      return car;
    } catch (error) {
      throw error;
    }
  }

  async getAllCars() {
    try {
      const cars = await this.prisma.car.findMany({
        select: {
          id: true,
          brand: true,
          model: true,
          plate: true,
          ownerId: true,
        },
      });
      return cars;
    } catch (error) {
      throw error;
    }
  }
}
