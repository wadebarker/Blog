import {
  IsNotEmpty,
  IsEmail,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @Matches('^[a-zA-Z-]+$|^[а-яА-ЯёЁ]+$')
  @Length(2, 20)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Matches('^[a-zA-Z-]+$|^[а-яА-ЯёЁ]+$')
  @Length(2, 20)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;
}
