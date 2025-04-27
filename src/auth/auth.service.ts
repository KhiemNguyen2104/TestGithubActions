import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, SignupDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}


    async getLogin(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                userId: dto.userId
            }
        })

        if (!user) {
            throw new ForbiddenException("User not found");
        }

        const hashPassword = user.hash_key;

        const isMatch = await argon.verify(hashPassword, dto.password);
        if (!isMatch) {
            throw new ForbiddenException("Password is wrong");
        }
        const token = await this.signToken(user.userId, user.userName);
        return { token: token };
    }

    async getSignup(dto: SignupDto) {
        const hash_key = await argon.hash(dto.password)

        try {
            const user = await this.prisma.user.create({
                data: {
                    userId: dto.userId,
                    userName: dto.userName,
                    hash_key: hash_key
                }
            })

            return await this.signToken(user.userId, user.userName)
        } catch (err) {
            throw new ForbiddenException(`Cannot register for a new account: ${err}`)
        }
    }

    async signToken(user_id: string, user_name: string): Promise<{ access_token: string }> {
        const payload = {
            sub: user_id,
            user_name,
        }

        const secret = process.env.JWT_SECRET;

        try {
            const token = await this.jwt.signAsync(payload, {
                expiresIn: '30m',
                secret: secret,
            });

            return { access_token: token };
        }
        catch (error) {
            throw new Error('Error signing the token');
        }
    }
}
