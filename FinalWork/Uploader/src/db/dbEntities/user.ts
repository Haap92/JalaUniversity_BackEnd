import { Column, Entity, ObjectIdColumn, ObjectID } from "typeorm";

@Entity()
export default class User {

  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  age!: number;

}