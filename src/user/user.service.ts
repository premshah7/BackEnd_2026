import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Role, RoleType } from 'src/role/role.entity';
import { NotFoundError } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    ) { }

    findAll(): Promise<User[]> {
        return this.userRepo.find({
            select: ['id', 'name', 'email', 'createdAt']
        })
    }

    findByEmail(email: string): Promise<User | null> {
        return this.userRepo.findOne({
            where: { email },
            relations: ['role'],
        });
    }

    async findById(id: number) {
        const user = await this.userRepo.findOne({
            where: { id },
            select: ['id', 'name', 'email', 'createdAt'],
            relations: ['role']
        });

        if (!user) throw new NotFoundException('User id not found');

        return user;
    }

    async create(creatUserDto: CreateUserDto) {
        const oldUser = await this.userRepo.findOne({
            where: { email: creatUserDto.email }
        });
        if (oldUser) throw new ConflictException('Email exists !!');

        const role = await this.roleRepo.findOne({
            where: { name: creatUserDto.role as RoleType }
        })
        if (!role) throw new NotFoundException('Role not found !!');

        const hashedPwd = await bcrypt.hash(creatUserDto.password, 10)

        const newUser = this.userRepo.create({
            name: creatUserDto.name,
            email: creatUserDto.email,
            password: hashedPwd,
            role: role,
        });

        const saveUser = await this.userRepo.save(newUser);

        return saveUser;
    }
}
