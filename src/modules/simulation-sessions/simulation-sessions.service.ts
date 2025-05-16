import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SimulationSession } from './entities/simulation-session.entity';
import { CreateSimulationSessionDto } from './dto/create-simulation-session.dto';
import { UpdateSimulationSessionDto } from './dto/update-simulation-session.dto';
import { CaseResponse, CaseService } from '../../interfaces/grpc/aide-backend.interface';

/**
 * Simulation sessions service
 * Handles CRUD operations for simulation sessions
 */
@Injectable()
export class SimulationSessionsService {
  private caseService: CaseService;

  constructor(
    @InjectRepository(SimulationSession)
    private readonly sessionRepository: Repository<SimulationSession>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('AIDE_BACKEND_PACKAGE') private client: ClientGrpc,
  ) {}

  /**
   * Initialize gRPC services on module init
   */
  onModuleInit() {
    this.caseService = this.client.getService<CaseService>('CaseService');
  }

  /**
   * Create a new simulation session
   * @param createDto DTO for creating a session
   * @returns Created session
   */
  async create(createDto: CreateSimulationSessionDto): Promise<SimulationSession> {
    try {
      // Verify that the case exists in aide-backend
      await firstValueFrom(
        this.caseService.getCaseById({ case_id: createDto.caseId })
      );
      
      const session = this.sessionRepository.create({
        userId: createDto.userId,
        caseId: createDto.caseId,
      });
      
      return await this.sessionRepository.save(session);
    } catch (error) {
      throw new NotFoundException(`Case with ID ${createDto.caseId} not found`);
    }
  }

  /**
   * Find all simulation sessions
   * @returns Array of sessions
   */
  async findAll(): Promise<SimulationSession[]> {
    return await this.sessionRepository.find({
      relations: ['actions'],
    });
  }

  /**
   * Find sessions by user ID
   * @param userId User ID
   * @returns Array of sessions
   */
  async findByUserId(userId: string): Promise<SimulationSession[]> {
    return await this.sessionRepository.find({
      where: { userId },
      relations: ['actions'],
    });
  }

  /**
   * Find a session by ID
   * @param id Session ID
   * @returns Session or null
   */
  async findOne(id: string): Promise<SimulationSession> {
    const cacheKey = `session_${id}`;
    
    // Try to get from cache first
    const cachedSession = await this.cacheManager.get<SimulationSession>(cacheKey);
    if (cachedSession) {
      return cachedSession;
    }
    
    // If not in cache, get from database
    const session = await this.sessionRepository.findOne({
      where: { id },
      relations: ['actions', 'feedback'],
    });
    
    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }
    
    // Store in cache for future requests
    await this.cacheManager.set(cacheKey, session, 3600);
    
    return session;
  }

  /**
   * Update a simulation session
   * @param id Session ID
   * @param updateDto DTO for updating a session
   * @returns Updated session
   */
  async update(id: string, updateDto: UpdateSimulationSessionDto): Promise<SimulationSession> {
    const session = await this.findOne(id);
    
    // Update session properties
    Object.assign(session, updateDto);
    
    // Save updated session
    const updatedSession = await this.sessionRepository.save(session);
    
    // Update cache
    const cacheKey = `session_${id}`;
    await this.cacheManager.set(cacheKey, updatedSession, 3600);
    
    return updatedSession;
  }

  /**
   * Remove a simulation session
   * @param id Session ID
   * @returns Removed session
   */
  async remove(id: string): Promise<SimulationSession> {
    const session = await this.findOne(id);
    
    // Remove from cache
    const cacheKey = `session_${id}`;
    await this.cacheManager.del(cacheKey);
    
    // Remove from database
    await this.sessionRepository.remove(session);
    
    return session;
  }
} 