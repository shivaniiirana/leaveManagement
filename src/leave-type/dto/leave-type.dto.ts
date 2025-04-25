import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateLeaveTypeDto {
  @ApiProperty({ example: 'Sick Leave' })
  @IsString() @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 10, description: 'Total number of days allowed for this leave type.' })
  @IsNumber() @IsOptional() @Min(0)
  totalDays?: number;  // Optional field, defaults to 0 if not provided
}

export class UpdateLeaveTypeDto {
  @ApiProperty({ example: 'Sick Leave' })
  @IsString() @IsOptional()
  type?: string;

  @ApiProperty({ example: 10, description: 'Total number of days allowed for this leave type.' })
  @IsNumber() @IsOptional() @Min(0)
  totalDays?: number;
}
