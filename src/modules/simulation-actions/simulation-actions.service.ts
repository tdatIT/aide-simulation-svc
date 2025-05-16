import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SimulationAction } from './entities/simulation-action.entity';
import { CreateSimulationActionDto } from './dto/create-simulation-action.dto';
import { UpdateSimulationActionDto } from './dto/update-simulation-action.dto';
import { SimulationSessionsService } from '../simulation-sessions/simulation-sessions.service';

/**
 * Simulation actions service
 * Handles CRUD operations for simulation actions
 */
@Injectable()
export class SimulationActionsService {
  constructor(
    @InjectRepository(SimulationAction)
    private readonly actionRepository: Repository<SimulationAction>,
    private readonly sessionsService: SimulationSessionsService,
  ) {}

  /**
   * Create a new simulation action
   * @param createDto DTO for creating an action
   * @returns Created action
   */
  async create(createDto: CreateSimulationActionDto): Promise<SimulationAction> {
    // Verify that the session exists
    await this.sessionsService.findOne(createDto.sessionId);
    
    const action = this.actionRepository.create({
      sessionId: createDto.sessionId,
      stepType: createDto.stepType,
      inputValue: createDto.inputValue,
    });
    
    return await this.actionRepository.save(action);
  }

  /**
   * Find all actions for a session
   * @param sessionId Session ID
   * @returns Array of actions
   */
  async findBySessionId(sessionId: string): Promise<SimulationAction[]> {
    return await this.actionRepository.find({
      where: { sessionId },
      order: { createdAt: 'ASC' },
    });
  }

  /**
   * Find an action by ID
   * @param id Action ID
   * @returns Action or null
   */
  async findOne(id: string): Promise<SimulationAction> {
    const action = await this.actionRepository.findOne({
      where: { id },
      relations: ['session'],
    });
    
    if (!action) {
      throw new NotFoundException(`Action with ID ${id} not found`);
    }
    
    return action;
  }

  /**
   * Update an action
   * @param id Action ID
   * @param updateDto DTO for updating an action
   * @returns Updated action
   */
  async update(id: string, updateDto: UpdateSimulationActionDto): Promise<SimulationAction> {
    const action = await this.findOne(id);
    
    // Update action properties
    Object.assign(action, updateDto);
    
    return await this.actionRepository.save(action);
  }

  /**
   * Remove an action
   * @param id Action ID
   * @returns Removed action
   */
  async remove(id: string): Promise<SimulationAction> {
    const action = await this.findOne(id);
    await this.actionRepository.remove(action);
    return action;
  }
} 