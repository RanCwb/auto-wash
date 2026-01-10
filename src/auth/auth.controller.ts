import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModel } from 'src/models/UserModel';
import { CreateUserDto } from 'src/dto/CreateUserDto';
import { LoginDto } from 'src/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async signIn(@Body() user: LoginDto) {
    return this.authService.signIn(user.email, user.password);
  }
}
