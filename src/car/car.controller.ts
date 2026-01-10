import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from 'src/dto/car.dto';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @HttpCode(200)
  @Post('create')
  async createCar(@Body() dto: CreateCarDto) {
    return this.carService.createCar(dto);
  }
}
