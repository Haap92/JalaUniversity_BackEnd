import { Column, Entity, PrimaryColumn } from "typeorm";
import Board from "../../entities/board";

@Entity()
export default class DBBoard implements Board { 

    @PrimaryColumn()
    id: number

    @Column()
    size: [[number],[number]]

}