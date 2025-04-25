import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaveModule } from './leave/leave.module';
import { LeaveTypeModule } from './leave-type/leave-type.module';

@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot("mongodb://localhost:27017/leaveManagement"), LeaveModule, LeaveTypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
