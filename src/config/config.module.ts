import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import databaseConfig from './database.config';
import cacheConfig from './cache.config';
import grpcConfig from './grpc.config';

/**
 * Custom configuration module
 * Registers all configuration files and validates environment variables
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, cacheConfig, grpcConfig],
      envFilePath: ['.env', '.env.local', '.env.development'],
    }),
  ],
})
export class AppConfigModule {} 