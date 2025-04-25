import { Controller, Post, Body, Get, Param, Put, Req, Request, Query } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';


@ApiTags('Leave Management')
@Controller({ path: 'leave', version: '1' }) 
export class LeaveController {
  constructor(private leaveService: LeaveService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Apply for leave' })
  @ApiResponse({ status: 200, description: 'Leave request submitted successfully' })
  async applyForLeave(@Body() body: any) {
    const { userId, leaveTypeId, startDate, endDate } = body;
    return await this.leaveService.applyForLeave(userId, leaveTypeId, startDate, endDate);
  }

 

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get paginated leave requests' })
  @ApiResponse({ status: 200, description: 'Paginated list of leave requests' })
  async getLeaveRequests(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return await this.leaveService.getLeaveRequests(page, limit);
  }
  



  @Get('leaveById')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update leave request status' })
  @ApiResponse({ status: 200, description: 'Leave request status updated successfully' })
  async getLeaveRequestById(@Request() req: any, ) {
    const user = req.user as { userId: string };
    console.log(user.userId);
    return this.leaveService.getLeaveRequestByIdService(user.userId);
}
}
