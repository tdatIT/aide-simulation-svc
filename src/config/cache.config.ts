import { registerAs } from '@nestjs/config';

/**
 * Cache configuration
 * Contains all Redis cache related environment variables
 */
export default registerAs('cache', () => ({
  /**
   * Redis host
   */
  host: process.env.REDIS_HOST || 'localhost',
  
  /**
   * Redis port
   */
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  
  /**
   * Redis password (if required)
   */
  password: process.env.REDIS_PASSWORD || undefined,
  
  /**
   * Default TTL for cached items in seconds
   */
  ttl: parseInt(process.env.CACHE_TTL || '3600', 10),
})); 