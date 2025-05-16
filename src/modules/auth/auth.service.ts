import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../interfaces/grpc/aide-backend.interface';
import { JwtPayload } from './strategies/jwt.strategy';

/**
 * Authentication service
 * Handles user authentication and token generation
 */
@Injectable()
export class AuthService {
  private userService: UserService;

  constructor(
    @Inject('AIDE_BACKEND_PACKAGE') private client: ClientGrpc,
    private jwtService: JwtService,
  ) {}

  /**
   * Initialize gRPC services on module init
   */
  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  /**
   * Validate user credentials
   * @param userId User ID
   * @returns User data
   */
  async validateUser(userId: string) {
    try {
      // Call the gRPC service to get user data
      const user = await firstValueFrom(
        this.userService.getUserById({ user_id: userId }),
      );
      
      if (!user) {
        throw new UnauthorizedException('Invalid user ID');
      }
      
      return user;
    } catch (error) {
      throw new UnauthorizedException('Failed to authenticate user');
    }
  }

  /**
   * Generate JWT token for authenticated user
   * @param userId User ID
   * @returns JWT token
   */
  async login(userId: string) {
    const user = await this.validateUser(userId);
    
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
} 