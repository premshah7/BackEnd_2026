import { Controller, UseGuards,Post } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { RoleType } from 'src/role/role.entity';

@Controller('ticket')
export class TicketController {
}
