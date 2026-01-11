import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BookingService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const { date, status, userId, carId, serviceId } = createBookingDto;

    const user = await this.usersService.findUserById(userId);

    if (!user) throw new NotFoundException('user not found');

    const car = await this.prisma.car.findUnique({ where: { id: carId } });
    if (!car) throw new NotFoundException('car not found');

    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service)
      throw new NotFoundException('service not found or not exists');

    try {
      const booking = await this.prisma.booking.create({
        data: {
          date,
          status,
          userId,
          carId,
          serviceId,
        },
      });

      return {
        message: 'Booking created successfully',
        booking,
      };
    } catch (error) {}
  }

  async findAll() {
    try {
      const bookings = await this.prisma.booking.findMany();
      return bookings;
    } catch (error) {}
  }

  async findOne(id: string) {
    const booking = await this.prisma.booking.findUnique({ where: { id } });
    if (!booking) throw new NotFoundException('booking not found');

    try {
      const booking = await this.prisma.booking.findUnique({ where: { id } });
      return booking;
    } catch (error) {}
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const { date, status, userId, carId, serviceId } = updateBookingDto;

    if (!date) throw new NotFoundException('date not found');
    if (!status) throw new NotFoundException('status not found');
    if (!userId) throw new NotFoundException('user not found');
    if (!carId) throw new NotFoundException('car not found');
    if (!serviceId) throw new NotFoundException('service not found');

    try {
      const booking = await this.prisma.booking.update({
        where: { id: id.toString() },
        data: {
          date,
          status,
          userId,
          carId,
          serviceId,
        },
      });

      return booking;
    } catch (error) {}
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
