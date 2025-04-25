import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LeaveRequest } from './schema/leave.schema';
import { LeaveType } from 'src/leave-type/schema/leave-type.schema';
import { User } from 'src/users/schema/users.schema';

@Injectable()
export class LeaveService {
  constructor(
    @InjectModel(LeaveRequest.name) private leaveModel: Model<LeaveRequest>,
    @InjectModel(LeaveType.name) private leaveTypeModel: Model<LeaveType>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}


async applyForLeave(userId: string, leaveTypeId: string, startDate: string | Date, endDate: string | Date) {
    const user = await this.userModel.findById(userId);
    const leaveType = await this.leaveTypeModel.findById(leaveTypeId);
  
    if (!user || !leaveType) {
      throw new Error('User or Leave Type not found');
    }
  
    // Convert startDate and endDate to Date objects if they are strings
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Validate the dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error('Invalid startDate or endDate');
    }
  
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;
  
    if (user.totalLeaves < totalDays) {
      throw new Error('Not enough leave balance');
    }
  
    const leaveRequest = new this.leaveModel({
      user,
      leaveType,
      startDate: start,
      endDate: end,
      totalDays,
    });
  
    await leaveRequest.save();
  
    user.totalLeaves -= totalDays; // Reduce user's leave balance
    await user.save();
  
    return leaveRequest;
  }


  async getLeaveRequests(page: number, limit: number) {
    try {
      // Validate page and limit
      if (page < 1 || limit < 1) {
        throw new Error('Page and limit must be greater than 0');
      }
  
      const skip = (page - 1) * limit;
  
      // Fetch leave requests with pagination
      const leaveRequests = await this.leaveModel
        .find()
        .skip(skip)
        .limit(limit);
  
      // Check if leave requests exist
      if (!leaveRequests || leaveRequests.length === 0) {
        return { message: 'No leave requests found' };
      }
  
      return leaveRequests;
    } catch (error) {
      // Log the error and throw an appropriate exception
      console.error('Error fetching leave requests:', error.message);
      throw new InternalServerErrorException('Failed to fetch leave requests');
    }
  }




  async getLeaveRequestByIdService(userId: string) {
    const leaveRequest = await this.leaveModel.findOne({
      'user._id': userId,
    });
  
    if (!leaveRequest) {
      return{message:"no leave request found for this user"}
    }
  
    return leaveRequest;
  }
  

}
