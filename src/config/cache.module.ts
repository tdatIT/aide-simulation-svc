import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

/**
 * Cache module for configuring Redis cache
 */
@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('cache.ttl'),
        max: 100,
      }),
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {} 