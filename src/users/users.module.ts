import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from './schema/users.schema'; // Import User schema
import { AwsModule } from 'src/aws/aws.module';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    forwardRef(() => AuthModule), // Use forwardRef to resolve circular dependency
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register User schema
    AwsModule, LoggerModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], 
})
export class UsersModule {}