import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as argon from 'argon2';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  login(loginDto: LoginDto): string {
    console.log(loginDto);
    return 'Login';
  }
  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const passwordHash = await argon.hash(registerDto.password);
    try {
      const user: UserEntity = await this.prismaService.user.create({
        data: {
          firstName: registerDto.firstName,
          lastName: registerDto.lastName,
          email: registerDto.email,
          password: passwordHash,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email already taken');
      } else {
        throw new ForbiddenException(error);
      }
    }
  }
}
