import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';

enum Status {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export class CreateBookingDto {
  @IsDateString()
  date: string; // ISO string (ex: "2026-01-10T15:30:00.000Z")

  @IsOptional()
  @IsEnum(Status)
  status?: Status; // PENDING as default

  @IsUUID()
  userId: string;

  @IsUUID()
  carId: string;

  @IsUUID()
  serviceId: string;
}
