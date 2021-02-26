import { UserDto } from './../dto/user.dto';
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from 'src/entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async createUser(createUser: UserDto): Promise<User>{
        const {userName, email, password} = createUser;

        const user = new User();
        user.userName = userName;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        await user.save();

        return user;
    }

    async validateUserPassword(userDto: UserDto): Promise<object>{
        const {email, password} = userDto;
        const mail = await this.findOne({email});

        if (mail && await mail.validatePassword(password)) {
            return mail.id;
        }
        else{
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt);
    }
    
}