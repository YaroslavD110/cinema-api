import { IsEmail, IsNotEmpty, MaxLength, IsUUID } from 'class-validator';

export class LoginDTO {
  @MaxLength(254)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(254)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  fingerprint: string;
}

export class RefreshTokenDTO {
  @IsNotEmpty()
  @IsUUID('4')
  refreshToken: string;

  @IsNotEmpty()
  fingerprint: string;
}
