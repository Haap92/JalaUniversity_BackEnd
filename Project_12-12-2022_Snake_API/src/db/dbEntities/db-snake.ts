import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export default class DBSnake { 

    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: number;

    @Column()
    axisX: number;

    @Column()
    axisY: number;

    @Column()
    direction: string;
    
    @Column()
    length: number;

    @Column()
    body: string;

    @Column()
    name: string;

    @Column()
    score: number;
}