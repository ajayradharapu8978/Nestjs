import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import * as bcrypt from "bcrypt";


@Entity()
export class User extends BaseEntity{

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    userName: string;

    @Column()
    email: string;

    @Column()
    password: string;


    @Column()
    salt: string;

    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}