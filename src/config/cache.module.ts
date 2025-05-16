import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

/**
 * Cache module for configuring Redis cache
 */
@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.get('cache.host'),
            port: configService.get('cache.port'),
          },
          password: configService.get('cache.password'),
          ttl: configService.get('cache.ttl'),
        });
        
        return {
          store,
        };
      },
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {} 