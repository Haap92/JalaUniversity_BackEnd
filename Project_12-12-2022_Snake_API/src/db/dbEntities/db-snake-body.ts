import { Column, Entity, PrimaryColumn } from "typeorm";
import SnakeBody from "../../domain/entities/snakeBody";

@Entity()
export default class DBSnakeBody implements SnakeBody { 

    @PrimaryColumn()
    id: number

    @Column()
    axisX: number

    @Column()
    axisY: number

}