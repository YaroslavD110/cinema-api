import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class LoginDTO {
  @MaxLength(254)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(254)
  @IsNotEmpty()
  password: string;
}
