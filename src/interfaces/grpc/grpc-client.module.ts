import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';

/**
 * gRPC client module for connecting to aide-backend service
 */
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'AIDE_BACKEND_PACKAGE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: `${configService.get('grpc.aideBackendHost')}:${configService.get('grpc.aideBackendPort')}`,
            package: 'aide_backend',
            protoPath: join(process.cwd(), configService.get('grpc.protoPath')),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['AIDE_BACKEND_PACKAGE'],
})
export class GrpcClientModule {} 