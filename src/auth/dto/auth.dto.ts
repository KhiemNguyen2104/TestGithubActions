import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: "User ID for the login", required: true, name: "User ID"})
    userId: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: "Password for the login", required: true, name: "Password"})
    password: string
}

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: "User ID for the register", required: true, name: "User ID"})
    userId: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: "User name for the register", required: true, name: "User Name"})
    userName: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: "Password for the register", required: true, name: "Password"})
    password: string
}