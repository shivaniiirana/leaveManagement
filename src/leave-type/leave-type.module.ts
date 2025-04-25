import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaveTypeService } from './leave-type.service';
import { LeaveTypeController } from './leave-type.controller';
import { LeaveType, LeaveTypeSchema } from './schema/leave-type.schema';
import { LeaveTypeSeeder } from './leave-type.seeder';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LeaveType.name, schema: LeaveTypeSchema }]), // Register LeaveType schema
  ],
  controllers: [LeaveTypeController],
  providers: [LeaveTypeService,LeaveTypeSeeder],
  exports: [LeaveTypeService, LeaveTypeSeeder], // Export if needed in other modules
})
export class LeaveTypeModule {}