import { Column, Entity, PrimaryColumn } from "typeorm";
import Food from "../../domain/entities/food";

@Entity()
export default class DBFood implements Food { 

    @PrimaryColumn()
    id: number;

    @Column()
    axisX: number;

    @Column()
    axisY: number;

}