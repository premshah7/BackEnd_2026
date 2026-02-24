import { Controller, Get, Post, UseGuards, Req, Body } from '@nestjs/common';
import { Role } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { RoleType } from 'src/role/role.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)    
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Role(RoleType.MANAGER, RoleType.USER)
    async getUsers(@Req() req) {
        const user = req.user;
        if (user.role === RoleType.MANAGER) return this.userService.findAll();
    }

    @Post()
    @UseGuards(RoleGuard)
    @Role(RoleType.MANAGER)
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
}
