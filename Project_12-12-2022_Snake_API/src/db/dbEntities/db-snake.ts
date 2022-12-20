import { Column, Entity, PrimaryColumn } from "typeorm";
import Snake from "../../domain/entities/snake";

@Entity()
export default class DBSnake implements Snake { 

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
    name: string;

    @Column()
    score: number;
}