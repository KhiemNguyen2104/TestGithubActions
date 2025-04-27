import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: "User ID for the login", required: true, default: "2211573"})
    userId: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: "Password for the login", required: true, default: "123456"})
    password: string
}

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: "User ID for the register", required: true, default: "2211573"})
    userId: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: "User name for the register", required: true, default: "Nguyen Phuc Gia Khiem"})
    userName: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: "Password for the register", required: true, default: "123456"})
    password: string
}