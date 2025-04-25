import { Module } from '@nestjs/common';
import { RedisProvider } from './redis.provider';

@Module({
  providers: [RedisProvider],
  exports: [RedisProvider], // Export the provider for use in other modules
})
export class RedisModule {}