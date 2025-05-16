import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './config/database.module';
import { RedisCacheModule } from './config/cache.module';
import { AuthModule } from './modules/auth/auth.module';
import { SimulationSessionsModule } from './modules/simulation-sessions/simulation-sessions.module';
import { SimulationActionsModule } from './modules/simulation-actions/simulation-actions.module';
import { SimulationFeedbacksModule } from './modules/simulation-feedbacks/simulation-feedbacks.module';

/**
 * Main application module
 * Imports all required modules for the application
 */
@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    RedisCacheModule,
    AuthModule,
    SimulationSessionsModule,
    SimulationActionsModule,
    SimulationFeedbacksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
