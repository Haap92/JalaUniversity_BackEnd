import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export default class DBFood { 

    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: number;

    @Column()
    axisX: number;

    @Column()
    axisY: number;

}