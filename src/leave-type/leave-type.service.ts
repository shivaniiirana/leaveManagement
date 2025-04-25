import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LeaveType, LeaveTypeDocument } from './schema/leave-type.schema';
import { CreateLeaveTypeDto, UpdateLeaveTypeDto } from './dto/leave-type.dto';

@Injectable()
export class LeaveTypeService {
  constructor(
    @InjectModel(LeaveType.name) private leaveTypeModel: Model<LeaveTypeDocument>,
  ) {}

  // Create a new leave type
  async create(createLeaveTypeDto: CreateLeaveTypeDto): Promise<LeaveType> {
    const createdLeaveType = new this.leaveTypeModel(createLeaveTypeDto);
    return createdLeaveType.save();
  }

  // Find all leave types
  async findAll(): Promise<LeaveType[]> {
    return this.leaveTypeModel.find().exec();
  }

  // Find one leave type by ID
  async findOne(id: string): Promise<LeaveType> {
    const leaveType = await this.leaveTypeModel.findById(id).exec();
    if (!leaveType) {
      throw new Error(`LeaveType with ID ${id} not found`);
    }
    return leaveType;
  }

 
}
