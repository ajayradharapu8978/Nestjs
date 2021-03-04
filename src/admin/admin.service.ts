import { createAdminDto } from '../dto/create-admin.dto';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { adminRepository } from './admin.repository';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AdminService {

    private logger = new Logger('AdminService');

    constructor(
        @InjectRepository(adminRepository)
        private readonly ajayRepository: adminRepository,
        private jwtService: JwtService
    ) { }


    async signUp(CreateAdmin: createAdminDto): Promise<any> {
        return this.ajayRepository.createAdmin(CreateAdmin);
    }

    async signIn(adminDto: createAdminDto): Promise<{ accessToken: string }> {
        const userName = await this.ajayRepository.validateAdminPassword(adminDto);
        const payload = userName;
        if (payload === null) {
            throw new UnauthorizedException("invalid Credentials");

        } else {
            const accessToken = await this.jwtService.sign({ payload });
            this.logger.debug(`Jwt Token Generated with payload "userName" : ${JSON.stringify(payload)}`)
            return { accessToken };
        }
    }

}
