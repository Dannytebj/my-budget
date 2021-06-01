/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
    Controller,
    UseGuards,
    HttpStatus,
    Res,
    Req,
    Post,
    Body,
    Logger
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/userDto/createUser.dto';
import { LoginUserDto } from './login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }
    private readonly logger = new Logger(AuthController.name);

    @Post('register')
    public async register(@Res() res: Response, @Body() createUserDto: CreateUserDto): Promise<any> {
        const result = await this.authService.register(createUserDto);
        if (!result.success) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.CREATED).json(result);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    public async login(@Req() req, @Res() res: Response): Promise<any> {
        const token = this.authService.createToken(req.user);
        return res.status(HttpStatus.OK).json(token);
    }
}
