import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { EntityMetadataValidator } from 'typeorm/metadata-builder/EntityMetadataValidator.js';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (!user) return null;

        const pass = await bcrypt.compare(password, user.password);
        if (user && pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role.name,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
