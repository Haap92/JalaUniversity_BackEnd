import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class User {

  @PrimaryColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

}