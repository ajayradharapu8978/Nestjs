import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";


@Entity()
export class Course extends BaseEntity{

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    university: string;

    @Column()
    courseName: string;

    @Column()
    fee: string;

    @Column()
    duration: string;

}