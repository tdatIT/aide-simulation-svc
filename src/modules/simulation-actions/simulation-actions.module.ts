import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimulationActionsService } from './simulation-actions.service';
import { SimulationActionsController } from './simulation-actions.controller';
import { SimulationAction } from './entities/simulation-action.entity';
import { SimulationSessionsModule } from '../simulation-sessions/simulation-sessions.module';

/**
 * Simulation actions module
 * Handles simulation action functionality
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([SimulationAction]),
    SimulationSessionsModule,
  ],
  controllers: [SimulationActionsController],
  providers: [SimulationActionsService],
  exports: [SimulationActionsService],
})
export class SimulationActionsModule {} 