import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './userDto/createUser.dto'

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    public async create(user: CreateUserDto): Promise<User> {
        return this.userRepository.save(user);
    }

    public async findAll(): Promise<User[]> {
        return this.userRepository.find();
      }
    
      public async findByEmail(userEmail: string): Promise<User | null> {
        return this.userRepository.findOne({ email: userEmail });
      }
    
      public async findById(id: string): Promise<User | null> {
        return this.userRepository.findOneOrFail(id);
      }
    
    public async register(userDto: CreateUserDto): Promise<User> {
        const { email } = userDto;
        let user = await this.userRepository.findOne({ where: { email } });
        if (user) {
          throw new HttpException(
            'User already exists',
            HttpStatus.BAD_REQUEST,
          );
        }
        user = await this.userRepository.create(userDto);
        return this.userRepository.save(user);
      }
}
