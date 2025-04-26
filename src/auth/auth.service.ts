import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    async getLogin() {
        return "This is login."
    }

    async getSignup() {
        return "This is signup."
    }
}
