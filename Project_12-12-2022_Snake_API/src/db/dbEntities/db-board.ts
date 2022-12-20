import { Column, Entity, PrimaryColumn } from "typeorm";
import Board from "../../domain/entities/board";

@Entity()
export default class DBBoard implements Board { 

    @PrimaryColumn()
    id: number;
    
    @Column()
    gridX: number;

    @Column()
    gridY: number;

}