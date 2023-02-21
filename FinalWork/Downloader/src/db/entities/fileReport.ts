import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class FileReport {

  @PrimaryColumn()
  id!: number;

  @Column()
  uploaderId: string;

  @Column()
  downloadsTotal: number;

  @Column()
  downloadsToday: number;

  @Column()
  acumulatedSizeTotal: number;

  @Column()
  acumulatedSizeDay: number;
}