import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimulationSessionsService } from './simulation-sessions.service';
import { SimulationSessionsController } from './simulation-sessions.controller';
import { SimulationSession } from './entities/simulation-session.entity';
import { GrpcClientModule } from '../../interfaces/grpc/grpc-client.module';

/**
 * Simulation sessions module
 * Handles simulation session functionality
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([SimulationSession]),
    GrpcClientModule,
  ],
  controllers: [SimulationSessionsController],
  providers: [SimulationSessionsService],
  exports: [SimulationSessionsService],
})
export class SimulationSessionsModule {} 