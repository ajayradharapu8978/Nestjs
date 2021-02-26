import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) { }

    async signUp(CreateAdmin: UserDto): Promise<any> {
        return this.userRepository.createUser(CreateAdmin);
    }

    async signIn(adminDto: UserDto): Promise<{user}> {
        const user = await this.userRepository.validateUserPassword(adminDto);
        return {user};
    }
}
