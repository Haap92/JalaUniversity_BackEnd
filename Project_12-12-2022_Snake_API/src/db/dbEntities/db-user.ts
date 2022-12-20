import { Column, Entity, PrimaryColumn } from "typeorm";
import User from "../../domain/entities/user";

@Entity()
export default class DBUser implements User { 

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
}