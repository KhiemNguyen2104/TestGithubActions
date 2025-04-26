import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @ApiOperation({ summary: "This is the login function" })
    @Post('login')
    async login() {
        return this.authService.getLogin()
    }

    @ApiOperation({ summary: "This is the signup function" })
    @Post('signup')
    async signup() {
        return this.authService.getSignup()
    }
}
