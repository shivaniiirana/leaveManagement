import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LeaveType } from './schema/leave-type.schema';


@Injectable()
export class LeaveTypeSeeder {
  constructor(
    @InjectModel(LeaveType.name) private leaveTypeModel: Model<LeaveType>,
  ) {}

  async seed() {
    const leaveTypes = [
      { type: 'Sick Leave', totalDays: 12 },
      { type: 'Casual Leave', totalDays: 10 },
      { type: 'Paid Leave', totalDays: 15 },
    ];

    // Check if the leave types are already in the database
    for (const leaveType of leaveTypes) {
      const existingLeaveType = await this.leaveTypeModel.findOne({ type: leaveType.type });
      if (!existingLeaveType) {
        await this.leaveTypeModel.create(leaveType);
        console.log(`Inserted leave type: ${leaveType.type}`);
      }
    }
  }
}
