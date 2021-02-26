import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";


@Entity()
export class University{

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    universityName: string;

    @Column()
    country: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    Website: string;
}