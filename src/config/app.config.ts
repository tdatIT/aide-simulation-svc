import { registerAs } from '@nestjs/config';

/**
 * Application configuration
 * Contains all app-related environment variables
 */
export default registerAs('app', () => ({
  /**
   * Application environment (development, production, test)
   */
  environment: process.env.NODE_ENV || 'development',
  
  /**
   * Application port
   */
  port: parseInt(process.env.PORT || '3000', 10),
  
  /**
   * JWT secret key for authentication
   */
  jwtSecret: process.env.JWT_SECRET || 'super-secret-key-change-in-production',
  
  /**
   * JWT expiration time
   */
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  
  /**
   * API prefix for all endpoints
   */
  apiPrefix: process.env.API_PREFIX || 'api',
})); 