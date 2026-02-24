import { Module } from '@nestjs/common';
import { RolesController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RoleService],
  exports:[RoleService]
})
export class RolesModule {}
