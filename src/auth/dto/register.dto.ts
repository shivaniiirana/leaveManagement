import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Shivani' })
  @IsString() @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Rana' })
  @IsString() 
  lastName: string;

  @ApiProperty({ example: 'shivani@example.com' })
  @IsString() @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'StrongPassword123' })
  @IsString() @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'shivanirana' })
  @IsString() @IsNotEmpty()
  userName: string;

  @ApiProperty({ example: '9876543210' })
  @IsString() @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: '2002-10-10' })
  @IsString() @IsNotEmpty()
  dob: string;

  @ApiProperty({ example: 'Male', enum: ['Male', 'Female', 'Other'] })
  @IsString() @IsNotEmpty()
  gender: string;

  image?:string;
}
