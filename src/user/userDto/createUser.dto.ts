import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    readonly id: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly fullname: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly totalIncome: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly password: string;
}