import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export default class DBGame { 

    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: number;

    @Column()
    status: string;

    @Column()
    speed: number;

    @Column()
    gameBoard: string;

}