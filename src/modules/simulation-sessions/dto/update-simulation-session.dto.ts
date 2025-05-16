import { IsBoolean, IsInt, IsOptional } from 'class-validator';

/**
 * DTO for updating a simulation session
 */
export class UpdateSimulationSessionDto {
  /**
   * Completion timestamp (set when session is completed)
   */
  @IsOptional()
  completedAt?: Date;

  /**
   * Final score for the session
   */
  @IsOptional()
  @IsInt()
  finalScore?: number;

  /**
   * Whether feedback has been generated
   */
  @IsOptional()
  @IsBoolean()
  feedbackGenerated?: boolean;
} 