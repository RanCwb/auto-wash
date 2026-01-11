import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from 'src/dto/car.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @HttpCode(200)
  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createCar(@Body() dto: CreateCarDto) {
    return this.carService.createCar(dto);
  }

  @HttpCode(200)
  @Post('all')
  @UseGuards(JwtAuthGuard)
  async getAllCars() {
    return this.carService.getAllCars();
  }
}
