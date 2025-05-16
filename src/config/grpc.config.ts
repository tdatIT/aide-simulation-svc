import { registerAs } from '@nestjs/config';

/**
 * gRPC configuration
 * Contains all gRPC related environment variables
 */
export default registerAs('grpc', () => ({
  /**
   * gRPC service host for aide-backend
   */
  aideBackendHost: process.env.GRPC_AIDE_BACKEND_HOST || 'localhost',
  
  /**
   * gRPC service port for aide-backend
   */
  aideBackendPort: parseInt(process.env.GRPC_AIDE_BACKEND_PORT || '50051', 10),
  
  /**
   * Path to proto file
   */
  protoPath: process.env.GRPC_PROTO_PATH || 'src/interfaces/grpc/proto/aide-backend.proto',
})); 