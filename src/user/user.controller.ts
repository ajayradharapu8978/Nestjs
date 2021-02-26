import { UserDto } from './../dto/user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @Post('signUp')
    signUp(@Body() userDto: UserDto): Promise<any>{
        return this.userService.signUp(userDto)
    }

    @Post('signIn')
    signIn(@Body() userDto: UserDto): Promise<{user}>{
        return this.userService.signIn(userDto)
    }
}
