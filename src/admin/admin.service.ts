import { createAdminDto } from '../dto/create-admin.dto';
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { adminRepository } from './admin.repository';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AdminService {


    constructor(
        @InjectRepository(adminRepository)
        private readonly ajayRepository: adminRepository,
        private jwtService: JwtService
    ) { }


    async signUp(CreateAdmin: createAdminDto): Promise<any> {
        return this.ajayRepository.createAdmin(CreateAdmin);
    }

    async signIn(adminDto: createAdminDto): Promise<{ accessToken: string}> {
        const userName = await this.ajayRepository.validateAdminPassword(adminDto);
        const payload = userName;
        if (payload === null) {
            throw new UnauthorizedException("invalid Credentials");
            
        } else {
            const accessToken = await this.jwtService.sign({payload});
            return { accessToken };
        }
    }

}
