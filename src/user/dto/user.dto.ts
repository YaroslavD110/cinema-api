import { MaxLength, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @MaxLength(254)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 254 })
  username: string;

  @MaxLength(254)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 254 })
  firstName: string;

  @MaxLength(254)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 254 })
  lastName: string;

  @MaxLength(254)
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ maxLength: 254 })
  email: string;

  @MaxLength(254)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 254 })
  password: string;
}
