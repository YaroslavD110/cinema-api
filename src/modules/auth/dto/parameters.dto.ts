import { IsEmail, IsNotEmpty, MaxLength, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @MaxLength(255)
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ maxLength: 255 })
  email: string;

  @MaxLength(255)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 255 })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ maxLength: 255 })
  fingerprint: string;
}

export class RefreshTokenDTO {
  @IsNotEmpty()
  @IsUUID('4')
  @ApiProperty({ maxLength: 255 })
  refreshToken: string;

  @IsNotEmpty()
  @ApiProperty({ maxLength: 255 })
  fingerprint: string;
}
