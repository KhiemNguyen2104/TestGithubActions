import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @ApiOperation({ summary: "This is the login function" })
    @Post('login')
    @ApiBody({type: LoginDto, required: true})
    async login(@Body() dto: LoginDto) {
        return this.authService.getLogin(dto)
    }

    @ApiOperation({ summary: "This is the signup function" })
    @Post('signup')
    @ApiBody({type: SignupDto, required: true})
    async signup(@Body() dto: SignupDto) {
        return this.authService.getSignup(dto)
    }
}
