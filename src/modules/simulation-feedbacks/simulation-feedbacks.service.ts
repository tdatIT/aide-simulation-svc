import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SimulationFeedback } from './entities/simulation-feedback.entity';
import { CreateSimulationFeedbackDto } from './dto/create-simulation-feedback.dto';
import { UpdateSimulationFeedbackDto } from './dto/update-simulation-feedback.dto';
import { SimulationSessionsService } from '../simulation-sessions/simulation-sessions.service';

/**
 * Simulation feedbacks service
 * Handles CRUD operations for simulation feedbacks
 */
@Injectable()
export class SimulationFeedbacksService {
  constructor(
    @InjectRepository(SimulationFeedback)
    private readonly feedbackRepository: Repository<SimulationFeedback>,
    private readonly sessionsService: SimulationSessionsService,
  ) {}

  /**
   * Create a new simulation feedback
   * @param createDto DTO for creating feedback
   * @returns Created feedback
   */
  async create(createDto: CreateSimulationFeedbackDto): Promise<SimulationFeedback> {
    // Verify that the session exists
    const session = await this.sessionsService.findOne(createDto.sessionId);
    
    // Check if feedback already exists for this session
    const existingFeedback = await this.feedbackRepository.findOne({
      where: { sessionId: createDto.sessionId },
    });
    
    if (existingFeedback) {
      throw new Error(`Feedback already exists for session ${createDto.sessionId}`);
    }
    
    const feedback = this.feedbackRepository.create({
      sessionId: createDto.sessionId,
      feedbackText: createDto.feedbackText,
      checklistJson: createDto.checklistJson,
    });
    
    const savedFeedback = await this.feedbackRepository.save(feedback);
    
    // Update session to mark feedback as generated
    await this.sessionsService.update(createDto.sessionId, {
      feedbackGenerated: true,
    });
    
    return savedFeedback;
  }

  /**
   * Find feedback by session ID
   * @param sessionId Session ID
   * @returns Feedback or null
   */
  async findBySessionId(sessionId: string): Promise<SimulationFeedback> {
    const feedback = await this.feedbackRepository.findOne({
      where: { sessionId },
      relations: ['session'],
    });
    
    if (!feedback) {
      throw new NotFoundException(`Feedback for session ${sessionId} not found`);
    }
    
    return feedback;
  }

  /**
   * Find a feedback by ID
   * @param id Feedback ID
   * @returns Feedback or null
   */
  async findOne(id: string): Promise<SimulationFeedback> {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: ['session'],
    });
    
    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
    
    return feedback;
  }

  /**
   * Update a feedback
   * @param id Feedback ID
   * @param updateDto DTO for updating feedback
   * @returns Updated feedback
   */
  async update(id: string, updateDto: UpdateSimulationFeedbackDto): Promise<SimulationFeedback> {
    const feedback = await this.findOne(id);
    
    // Update feedback properties
    Object.assign(feedback, updateDto);
    
    return await this.feedbackRepository.save(feedback);
  }

  /**
   * Remove a feedback
   * @param id Feedback ID
   * @returns Removed feedback
   */
  async remove(id: string): Promise<SimulationFeedback> {
    const feedback = await this.findOne(id);
    
    // Update session to mark feedback as not generated
    await this.sessionsService.update(feedback.sessionId, {
      feedbackGenerated: false,
    });
    
    await this.feedbackRepository.remove(feedback);
    return feedback;
  }
} 