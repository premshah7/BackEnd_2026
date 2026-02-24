import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketCommentModule } from './ticket-comment/ticket-comment.module';
import { UserModule } from './user/user.module';
import { StatusLogController } from './status-log/status-log.controller';
import { StatusLogService } from './status-log/status-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TicketModule } from './ticket/ticket.module';
import { RolesModule } from './role/role.module';
import { StatusLogModule } from './status-log/status-log.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '127.0.0.1',
      port: 1433,
      username: 'sa',
      password: 'Prem@1823',
      database: 'ticket-management',
      autoLoadEntities: true,
      synchronize: true,
      options: {
        trustServerCertificate: true,
      },
    }),
    TicketCommentModule,
    UserModule,
    TicketModule,
    RolesModule,
    StatusLogModule,
    AuthModule,
  ],
  controllers: [AppController, StatusLogController],
  providers: [AppService, StatusLogService],
})
export class AppModule {}
