import { createAdminDto } from '../dto/create-admin.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly ajayService: AdminService
    ){}

    @Post('/signUp')
    signUp(@Body() adminDto: createAdminDto): Promise<any>{
        return this.ajayService.signUp(adminDto);
    }

    @Post('/signIn')
    signIn(@Body() adminDto: createAdminDto): Promise<{accessToken: string}>{
        return this.ajayService.signIn(adminDto);
    }
}
