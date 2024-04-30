import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { LoggerModule } from '../logger/logger.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';

@Module({
  imports: [UsecasesProxyModule.register(), LoggerModule, ExceptionsModule],
  controllers: [AuthController, UserController],
})
export class ControllersModule {}
