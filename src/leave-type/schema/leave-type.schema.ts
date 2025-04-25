import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeaveTypeDocument = LeaveType & Document;

@Schema()
export class LeaveType {
  @Prop({ required: true })
  type: string;

  @Prop({ default: 0 })
  totalDays: number;  // Total number of days allowed for this type of leave
}

export const LeaveTypeSchema = SchemaFactory.createForClass(LeaveType);
