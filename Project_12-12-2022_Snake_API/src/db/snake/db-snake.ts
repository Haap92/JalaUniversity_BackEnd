import { Column, Entity, PrimaryColumn } from "typeorm";
import Snake from "../../entities/snake";

@Entity()
export default class DBSnake implements Snake { 

    @PrimaryColumn()
    id: number

    @Column()
    position: [[number],[number]]

}