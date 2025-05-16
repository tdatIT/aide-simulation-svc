import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SimulationFeedbacksService } from './simulation-feedbacks.service';
import { CreateSimulationFeedbackDto } from './dto/create-simulation-feedback.dto';
import { UpdateSimulationFeedbackDto } from './dto/update-simulation-feedback.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

/**
 * Simulation feedbacks controller
 * Handles HTTP endpoints for simulation feedbacks
 */
@Controller('simulation-feedbacks')
@UseGuards(JwtAuthGuard)
export class SimulationFeedbacksController {
  constructor(private readonly feedbacksService: SimulationFeedbacksService) {}

  /**
   * Create a new simulation feedback
   * @param createDto DTO for creating feedback
   * @returns Created feedback
   */
  @Post()
  create(@Body() createDto: CreateSimulationFeedbackDto) {
    return this.feedbacksService.create(createDto);
  }

  /**
   * Get feedback by session ID
   * @param sessionId Session ID
   * @returns Feedback
   */
  @Get('by-session/:sessionId')
  findBySession(@Param('sessionId') sessionId: string) {
    return this.feedbacksService.findBySessionId(sessionId);
  }

  /**
   * Get a feedback by ID
   * @param id Feedback ID
   * @returns Feedback
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbacksService.findOne(id);
  }

  /**
   * Update a feedback
   * @param id Feedback ID
   * @param updateDto DTO for updating feedback
   * @returns Updated feedback
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateSimulationFeedbackDto) {
    return this.feedbacksService.update(id, updateDto);
  }

  /**
   * Delete a feedback
   * @param id Feedback ID
   * @returns Deleted feedback
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbacksService.remove(id);
  }
} 