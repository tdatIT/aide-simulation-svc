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
import { SimulationActionsService } from './simulation-actions.service';
import { CreateSimulationActionDto } from './dto/create-simulation-action.dto';
import { UpdateSimulationActionDto } from './dto/update-simulation-action.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

/**
 * Simulation actions controller
 * Handles HTTP endpoints for simulation actions
 */
@Controller('simulation-actions')
@UseGuards(JwtAuthGuard)
export class SimulationActionsController {
  constructor(private readonly actionsService: SimulationActionsService) {}

  /**
   * Create a new simulation action
   * @param createDto DTO for creating an action
   * @returns Created action
   */
  @Post()
  create(@Body() createDto: CreateSimulationActionDto) {
    return this.actionsService.create(createDto);
  }

  /**
   * Get all actions for a session
   * @param sessionId Session ID
   * @returns Array of actions
   */
  @Get('by-session/:sessionId')
  findBySession(@Param('sessionId') sessionId: string) {
    return this.actionsService.findBySessionId(sessionId);
  }

  /**
   * Get an action by ID
   * @param id Action ID
   * @returns Action
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actionsService.findOne(id);
  }

  /**
   * Update an action
   * @param id Action ID
   * @param updateDto DTO for updating an action
   * @returns Updated action
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateSimulationActionDto) {
    return this.actionsService.update(id, updateDto);
  }

  /**
   * Delete an action
   * @param id Action ID
   * @returns Deleted action
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actionsService.remove(id);
  }
} 