import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { LeaveRequest, LeaveRequestSchema } from './schema/leave.schema';
import { LeaveType, LeaveTypeSchema } from 'src/leave-type/schema/leave-type.schema';
import { User, UserSchema } from 'src/users/schema/users.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LeaveRequest.name, schema: LeaveRequestSchema },
      { name: LeaveType.name, schema: LeaveTypeSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [LeaveService],
  controllers: [LeaveController],
})
export class LeaveModule {}
