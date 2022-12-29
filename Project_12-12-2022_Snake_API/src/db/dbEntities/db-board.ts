import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export default class DBBoard { 

    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: number;
    
    @Column()
    gridX: number;

    @Column()
    gridY: number;

}