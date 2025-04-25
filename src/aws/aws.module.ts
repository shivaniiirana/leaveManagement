
import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';

@Module({
  providers: [AwsService],
  exports: [AwsService], // Export it so other modules can use it
})
export class AwsModule {}