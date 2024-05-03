import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString, isArray, isObject } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly username: string;
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsBoolean()
  readonly active: boolean;
}

export class AddUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly username: string;
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly password: string;
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsBoolean()
  readonly active: boolean;
}
