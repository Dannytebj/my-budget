import * as jwt from 'jsonwebtoken';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interface/jwt-payload.interface';
import { User } from '../user/user.entity';
import { UserRO } from '../user/user.ro';
import { debug } from 'console';
import { RegistrationStatus } from './interface/reg-status.interface';
import { CreateUserDto } from '../user/userDto/createUser.dto';



@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    private readonly logger = new Logger(AuthService.name);
  
  async register(user: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user register',
    };
    try {
      await this.userService.register(user);
    } catch (err) {
      status = { success: false, message: err };
    }
    return status;
  }

  createToken(user: User): any {
    const expiresIn = 3600;

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstname: user.fullname,
      },
      process.env.SECRET_KEY,
      { expiresIn },
    );

    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUserToken(payload: JwtPayload): Promise<User> {
    return this.userService.findById(payload.id);
  }

  async validateUser(email: string, password: string): Promise<UserRO> {
    const user = await this.userService.findByEmail(email);

    if (user && await user.comparePassword(password)) {
      this.logger.log('password check success');
      const { password, ...result } = user;
      return result;
    }
    this.logger.log('password check failed');
    return null;
  }
}
