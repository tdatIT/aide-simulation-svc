import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SimulationSessionsService } from './simulation-sessions.service';
import { CreateSimulationSessionDto } from './dto/create-simulation-session.dto';
import { UpdateSimulationSessionDto } from './dto/update-simulation-session.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

/**
 * Simulation sessions controller
 * Handles HTTP endpoints for simulation sessions
 */
@Controller('simulation-sessions')
@UseGuards(JwtAuthGuard)
export class SimulationSessionsController {
  constructor(private readonly sessionsService: SimulationSessionsService) {}

  /**
   * Create a new simulation session
   * @param createDto DTO for creating a session
   * @returns Created session
   */
  @Post()
  create(@Body() createDto: CreateSimulationSessionDto) {
    return this.sessionsService.create(createDto);
  }

  /**
   * Get all simulation sessions
   * @returns Array of sessions
   */
  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }

  /**
   * Get sessions for the current user
   * @param req Request object containing user information
   * @returns Array of sessions
   */
  @Get('my-sessions')
  findMySessions(@Request() req) {
    return this.sessionsService.findByUserId(req.user.id);
  }

  /**
   * Get a session by ID
   * @param id Session ID
   * @returns Session
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  /**
   * Update a session
   * @param id Session ID
   * @param updateDto DTO for updating a session
   * @returns Updated session
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateSimulationSessionDto) {
    return this.sessionsService.update(id, updateDto);
  }

  /**
   * Delete a session
   * @param id Session ID
   * @returns Deleted session
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(id);
  }
} 