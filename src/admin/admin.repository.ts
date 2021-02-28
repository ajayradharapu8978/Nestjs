import { createAdminDto } from "src/dto/create-admin.dto";
import { Ajay } from "src/entities/ajay.entity";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@EntityRepository(Ajay)
export class adminRepository extends Repository<Ajay>{

    async createAdmin(createAdmin: createAdminDto): Promise<Ajay>{
        const {userName, password} = createAdmin;

        const admin = new Ajay();
        admin.userName = userName;
        admin.salt = await bcrypt.genSalt();
        admin.password = await this.hashPassword(password, admin.salt);
        await admin.save();

        return admin;
    }

    async validateAdminPassword(adminDto: createAdminDto): Promise<string>{
        const {userName, password} = adminDto;
        const admin = await this.findOne({userName});
        if (admin && await admin.validatePassword(password)) {
            return admin.userName;
        }
        else{
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt);
    }
    
}