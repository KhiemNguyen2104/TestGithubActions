import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, SignupDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) { }


    async getLogin(dto: LoginDto) {
        let users = await this.prisma.user.findMany({
            where: {
                userName: dto.userName
            }
        })

        if (!users || users.length == 0) {
            throw new ForbiddenException("User name or password is wrong");
        }

        // console.log(users)

        const user = users.filter(async (rec) => await argon.verify(rec.hash_key, dto.password + "_" + dto.userName + "_" + rec.userId))[0]

        // console.log(user)

        if (!user) {
            throw new ForbiddenException("User name or password is wrong");
        }

        const access_token = await this.signAccessToken(user.userId, user.userName);
        const refresh_token = await this.refreshToken(user.userId, user.userName);

        return { access_token: access_token, refresh_token: refresh_token };
    }

    async getSignup(dto: SignupDto) {
        const hash_key = await argon.hash(dto.password + "_" + dto.userName + "_" + dto.userId)

        const access_token = await this.signAccessToken(dto.userId, dto.userName);

        try {
            const user = await this.prisma.user.create({
                data: {
                    userId: dto.userId,
                    userName: dto.userName,
                    refresh_token: "temp",
                    hash_key: hash_key
                }
            })

            const refresh_token = await this.refreshToken(dto.userId, dto.userName);

            return { access_token: access_token, refresh_token: refresh_token };
        } catch (err) {
            throw new ForbiddenException(`Cannot register for a new account: ${err}`)
        }
    }

    async signAccessToken(user_id: string, user_name: string): Promise<string> {
        const payload = {
            sub: user_id,
            user_name,
        }

        const secret = process.env.ACCESS_TOKEN_SECRET;

        try {
            const token = await this.jwt.signAsync(payload, {
                expiresIn: '15s',
                secret: secret,
            });

            return token;
        }
        catch (error) {
            throw new Error('Error signing the token');
        }
    }

    async reSignAccessToken(refresh_token: string): Promise<string> {
        try {
            const payload = (await this.jwt.verifyAsync(refresh_token, {
                secret: process.env.REFRESH_TOKEN_SECRET,
            }))

            return await this.signAccessToken(payload.sub, payload.email);
        } catch (err) {
            throw new ForbiddenException(err);
        }
    }

    async refreshToken(user_id: string, user_name: string): Promise<string> {
        let user = await this.prisma.user.findUnique({
            where: {
                userId: user_id
            }
        })

        if (!user) {
            throw new ForbiddenException("Cannot find the user")
        }

        const secret = process.env.REFRESH_TOKEN_SECRET

        const payload = {
            sub: user_id,
            user_name
        }

        try {
            const token = await this.jwt.signAsync(payload, {
                expiresIn: '1h',
                secret: secret
            })

            user = await this.prisma.user.update({
                where: {
                    userId: user_id
                },
                data: {
                    refresh_token: token
                }
            })

            return token
        } catch (err) {
            throw new ForbiddenException(err)
        }
    }
}
