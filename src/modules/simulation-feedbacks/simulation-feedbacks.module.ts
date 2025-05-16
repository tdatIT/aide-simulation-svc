import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimulationFeedbacksService } from './simulation-feedbacks.service';
import { SimulationFeedbacksController } from './simulation-feedbacks.controller';
import { SimulationFeedback } from './entities/simulation-feedback.entity';
import { SimulationSessionsModule } from '../simulation-sessions/simulation-sessions.module';

/**
 * Simulation feedbacks module
 * Handles simulation feedback functionality
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([SimulationFeedback]),
    SimulationSessionsModule,
  ],
  controllers: [SimulationFeedbacksController],
  providers: [SimulationFeedbacksService],
  exports: [SimulationFeedbacksService],
})
export class SimulationFeedbacksModule {} 