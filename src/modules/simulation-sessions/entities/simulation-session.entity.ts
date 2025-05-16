import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SimulationAction } from '../../simulation-actions/entities/simulation-action.entity';
import { SimulationFeedback } from '../../simulation-feedbacks/entities/simulation-feedback.entity';

/**
 * SimulationSession entity
 * Represents a simulation session in the database
 */
@Entity('simulation_sessions')
export class SimulationSession {
  /**
   * Primary key - UUID v4
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * User ID from aide-backend
   */
  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;

  /**
   * Case ID from aide-backend
   */
  @Column({ name: 'case_id', type: 'uuid', nullable: false })
  caseId: string;

  /**
   * Session start timestamp
   */
  @Column({ name: 'started_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  startedAt: Date;

  /**
   * Session completion timestamp
   */
  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completedAt: Date | null;

  /**
   * Final score for the session
   */
  @Column({ name: 'final_score', type: 'int', nullable: true })
  finalScore: number | null;

  /**
   * Whether feedback has been generated
   */
  @Column({ name: 'feedback_generated', type: 'boolean', default: false })
  feedbackGenerated: boolean;

  /**
   * Creation timestamp
   */
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  /**
   * Relation to simulation actions
   */
  @OneToMany(() => SimulationAction, (action) => action.session)
  actions: SimulationAction[];

  /**
   * Relation to simulation feedback
   */
  @OneToOne(() => SimulationFeedback, (feedback) => feedback.session)
  feedback: SimulationFeedback;
} 