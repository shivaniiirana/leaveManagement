import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/users.schema';
import { AwsModule } from 'src/aws/aws.module';
import { UsersModule } from 'src/users/users.module';
import { RedisModule } from 'src/redis/redis.module';
import { JwtAuthGuard } from './jwtAuth.guard';
import { JwtStrategy } from './jwt.strategy';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    forwardRef(() => UsersModule), // Use forwardRef to resolve circular dependency
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AwsModule, RedisModule, LoggerModule
  ],
  controllers: [AuthController,],
  providers: [AuthService, JwtAuthGuard, JwtStrategy],
  exports: [AuthService, JwtAuthGuard, JwtStrategy], // Export AuthService and guards if needed in other modules
})
export class AuthModule {}