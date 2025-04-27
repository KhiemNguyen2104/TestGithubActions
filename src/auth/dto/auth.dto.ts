import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: "User ID for the login", required: true})
    userId: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: "Password for the login", required: true})
    password: string
}

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: "User ID for the register", required: true})
    userId: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: "User name for the register", required: true})
    userName: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: "Password for the register", required: true})
    password: string
}