import { registerAs } from '@nestjs/config';

/**
 * Database configuration
 * Contains all PostgreSQL database related environment variables
 */
export default registerAs('database', () => ({
  /**
   * PostgreSQL host
   */
  host: process.env.DB_HOST || 'localhost',
  
  /**
   * PostgreSQL port
   */
  port: parseInt(process.env.DB_PORT || '5432', 10),
  
  /**
   * PostgreSQL username
   */
  username: process.env.DB_USERNAME || 'postgres',
  
  /**
   * PostgreSQL password
   */
  password: process.env.DB_PASSWORD || 'postgres',
  
  /**
   * PostgreSQL database name
   */
  database: process.env.DB_NAME || 'aide_simulation',
  
  /**
   * Auto-run migrations on application startup
   */
  autoLoadEntities: true,
  
  /**
   * Synchronize database schema with entities (disable in production)
   */
  synchronize: process.env.NODE_ENV !== 'production',
})); 