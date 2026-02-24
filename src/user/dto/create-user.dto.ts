import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { RoleType } from 'src/role/role.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Must be a valid email address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsNotEmpty()
  @IsEnum(RoleType, { message: 'Role must be one of: MANAGER, SUPPORT, USER' })
  role: string;
}
