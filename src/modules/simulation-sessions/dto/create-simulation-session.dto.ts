import { IsNotEmpty, IsUUID } from 'class-validator';

/**
 * DTO for creating a new simulation session
 */
export class CreateSimulationSessionDto {
  /**
   * User ID from aide-backend
   */
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  /**
   * Case ID from aide-backend
   */
  @IsUUID()
  @IsNotEmpty()
  caseId: string;
} 