import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/schema/users.schema';
import { LeaveType, LeaveTypeSchema } from 'src/leave-type/schema/leave-type.schema';

export type LeaveRequestDocument = LeaveRequest & Document;

@Schema({ timestamps: true })
export class LeaveRequest {
  @Prop({ type: User, required: true })
  user: User;

  @Prop({ type: LeaveTypeSchema, required: true })
  leaveType: LeaveType;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  totalDays: number;

  @Prop({ default: 'Pending' })
  status: string; // Pending, Approved, Rejected
}

export const LeaveRequestSchema = SchemaFactory.createForClass(LeaveRequest);
