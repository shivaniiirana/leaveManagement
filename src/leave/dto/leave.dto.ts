import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString, IsEnum } from 'class-validator';
import { LeaveStatus } from '../leave-status-enum';


export class CreateLeaveDto {
  @ApiProperty({ example: 'userId' })
  @IsString() @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: '2025-04-25T00:00:00.000Z' })
  @IsDateString() @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ example: '2025-04-30T00:00:00.000Z' })
  @IsDateString() @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ example: 'Sick Leave' })
  @IsString() @IsNotEmpty()
  leaveType: string;

  @ApiProperty({ example: 'Illness' })
  @IsString()
  reason?: string;

}

export class UpdateLeaveDto {
  @ApiProperty({ example: 'Sick Leave' })
  @IsString()
  leaveType?: string;

  @ApiProperty({ example: 'Approved' })
  @IsEnum(LeaveStatus)
  status?: LeaveStatus;

  @ApiProperty({ example: '2025-04-25T00:00:00.000Z' })
  @IsDateString()
  appliedOn?: Date;

  @ApiProperty({ example: '2025-04-30T00:00:00.000Z' })
  @IsDateString()
  endDate?: Date;
}
