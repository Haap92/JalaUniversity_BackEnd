import { Column, Entity, PrimaryColumn } from "typeorm";
import Game from "../../domain/entities/game";

@Entity()
export default class DBGame implements Game { 

    @PrimaryColumn()
    id: number;

    @Column()
    status: string;

    @Column()
    speed: number;

    @Column()
    gameBoard: string;

    @Column()
    food: string;
}