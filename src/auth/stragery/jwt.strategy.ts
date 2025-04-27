import { Injectable, ForbiddenException } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(payload: {
        sub: string,
        user_name: string,
        user_role: string,
    }) {
        const user = await this.prisma.user.findUnique({
            where: {
                userId: payload.sub,
            },
        });

        if (!user) {
            throw new ForbiddenException("User not found")
        }

        return {
            user_id: user.userId,
            user_name: user.userName
        }
    }
}