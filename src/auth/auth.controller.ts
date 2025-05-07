import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto, SignupDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: "This is the login function" })
    @Post('login')
    @ApiBody({ type: LoginDto, required: true })
    async login(@Body() dto: LoginDto) {
        return await this.authService.getLogin(dto)
    }

    @ApiOperation({ summary: "This is the signup function" })
    @Post('signup')
    @ApiBody({ type: SignupDto, required: true })
    async signup(@Body() dto: SignupDto) {
        return await this.authService.getSignup(dto)
    }

    @ApiOperation({ summary: "This is the API for refresh token getting" })
    @Post('refresh-token')
    @ApiBody({ type: RefreshTokenDto, required: true })
    async refreshToken(@Body() dto: RefreshTokenDto) {
        return await this.authService.refreshToken(dto.userId, dto.userName)
    }

    @ApiOperation({ summary: "This is the API for access token resigning" })
    @Post('resign-access-token')
    @ApiQuery({ name: "refresh_token", type: String, required: true, description: "Refresh token" })
    async reSignAccessToken(@Query('refresh_token') refresh_token: string) {
        return await this.authService.reSignAccessToken(refresh_token)
    }
}
